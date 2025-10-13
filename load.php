<?php
require_once 'config.php';  // DB-Verbindungsdaten laden
include('transform.php');   // erzeugt $transformedData aus der Aare Guru API

try {
    // Verbindung zur Datenbank herstellen
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Statement vorbereiten: Timestamp wird von der DB automatisch gesetzt!
    $sql = "INSERT INTO Aare_Jenny_Sara 
            (location_id, flow, flow_text, tt_Luft, Temp_H20, temp_text) 
            VALUES (?, ?, ?, ?, ?, ?)";

    $stmt = $pdo->prepare($sql);

    
    // Alle Standorte aus transform.php durchlaufen und einzeln einfügen
    foreach ($transformedData as $row) {
        echo "Füge ein: " . print_r($row, true) . "<br>";
        // Stelle sicher, dass fehlende Werte auf NULL gesetzt werden
        $stmt->execute([
            $row['location_id'] ?? 0,
            $row['flow'] ?? 0,
            $row['flow_text'] ?? '',
            $row['tt_Luft'] ?? 0,
            $row['Temp_H20'] ?? 0,
            $row['temp_text'] ?? ''
        ]);
    }

    echo "✅ Daten aus der Aare Guru API wurden erfolgreich in die Tabelle 'Aare_Jenny_Sara' eingefügt.";

} catch (PDOException $e) {
    die("❌ Datenbankfehler: " . $e->getMessage());
}
?>