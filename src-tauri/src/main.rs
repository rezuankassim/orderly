// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::path::BaseDirectory;
use tauri::Manager;
use printers::{get_printers, get_printer_by_name};
use tauri_plugin_sql::{Migration, MigrationKind};
use serde::Serialize;


#[derive(Serialize)]
struct SerializePrinter {
    pub name: String,
    pub system_name: String,
    pub driver_name: String,
}

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn retrieve_printers() -> String {
    let printers = get_printers();

    let serialize_printers: Vec<SerializePrinter> = printers
        .into_iter()
        .map(|printer| SerializePrinter {
            name: printer.name,
            system_name: printer.system_name,
            driver_name: printer.driver_name,
        })
        .collect();

    // Convert printers to JSON
    let json_result = serde_json::to_string(&serialize_printers);

    return json_result.expect("Failed to convert printers to JSON");
}

#[tauri::command]
fn print_example(handle: tauri::AppHandle, printer_name: String) -> String {
    let file_path = handle.path().resolve("print-example.pdf", BaseDirectory::AppLocalData).unwrap();

    let my_printer = get_printer_by_name(&printer_name);
    
    if my_printer.is_some() {
        let _ = my_printer.unwrap().print_file(&file_path.display().to_string(), None);
    }

    "Printed!".to_string()
}

fn main() {
    let migrations = vec![
        // Define your migrations here
        Migration {
            version: 1,
            description: "create_settings_table",
            sql: "CREATE TABLE settings (id INTEGER PRIMARY KEY, name VARCHAR(255) NOT NULL UNIQUE, content BLOB);",
            kind: MigrationKind::Up,
        },
    ];

    tauri::Builder::default()
        .plugin(tauri_plugin_process::init())
        .plugin(tauri_plugin_updater::Builder::new().build())
        .plugin(tauri_plugin_fs::init())
        .plugin(
            tauri_plugin_sql::Builder::default()
                .add_migrations("sqlite:mydatabase.db", migrations)
                .build(),
        )
        .invoke_handler(tauri::generate_handler![retrieve_printers, print_example])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
