// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use printpdf::*;
// use std::fs::File;
// use std::io::BufWriter;
use printers::get_printers;
use tauri_plugin_sql::{Migration, MigrationKind};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn retrieve_printers() -> String {
    let printers = get_printers();

    // Prevent this error `Vec<Printer>` doesn't implement `std::fmt::Display`
    let printers_vec = printers
        .iter()
        .map(|printer| format!("{:?}", printer))
        .collect::<Vec<String>>();

    // return json with array of printers
    format!("{:?}", printers_vec)
}

#[tauri::command]
fn print_example() {
    // let (doc, page1, layer1) = PdfDocument::new("Example Label", Mm(50.0), Mm(80.0), "Layer 1");
    // let current_layer = doc.get_page(page1).get_layer(layer1);

    // let text = "Hello, world!";

    // current_layer.use_text(text, 48.0, Mm(25.0), Mm(40.0));

    // doc.save(&mut BufWriter::new(File::create("example.pdf").unwrap()))
    //     .unwrap();
}

fn main() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_settings_table",
            sql: "CREATE TABLE settings (id INTEGER PRIMARY KEY, name VARCHAR(255) NOT NULL UNIQUE, content BLOB);",
            kind: MigrationKind::Up,
        }
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:mydatabase.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![retrieve_printers, print_example])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
