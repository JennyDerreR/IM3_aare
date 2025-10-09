<?php
/* ============================================================================
   HANDLUNGSANWEISUNG (transform.php)
   0) Schau dir die Rohdaten genau an und plane exakt, wie du die Daten umwandeln möchtest (auf Papier)
   1) Binde extract.php ein und erhalte das Rohdaten-Array.
   2) Definiere Mapping Koordinaten → Anzeigename (z. B. Bern/Chur/Zürich).
   3) Konvertiere Einheiten (z. B. °F → °C) und runde sinnvoll (Celsius = (Fahrenheit - 32) * 5 / 9).
   4) Leite eine einfache "condition" ab (z. B. sonnig/teilweise bewölkt/bewölkt/regnerisch).
   5) Baue ein kompaktes, flaches Array je Standort mit den Ziel-Feldern.
   6) Optional: Sortiere die Werte (z. B. nach Zeit), entferne irrelevante Felder.
   7) Validiere Pflichtfelder (location, temperature_celsius, …).
   8) Kodieren: json_encode(..., JSON_PRETTY_PRINT) → JSON-String.
   9) GIB den JSON-String ZURÜCK (return), nicht ausgeben – für den Load-Schritt.
  10) Fehlerfälle als Exception nach oben weiterreichen (kein HTML/echo).
   ============================================================================ */

// Bindet das Skript extract.php für Rohdaten ein und speichere es in $data
include('extract.php');

// print_r($data); // Zum Debuggen: Ausgabe des Rohdaten-Arrays
$locations_data = $data['values'] ?? [];


// echo "Jasper";



$transformedData = []; // Array zum Speichern der transformierten Daten

foreach ($locations_data as $location_key => $location_info) {
        
    // Assoziatives Array "transformedData" erstellen
    $transformedData[] = [
        'Temp_H20'    => $location_info['temperature'] ?? null,
        'temp_text'   => $location_info['temperature_text'] ?? null,
        'flow'        => $location_info['flow'] ?? null,
        'flow_text'   => $location_info['flow_text'] ?? null,
        'tt_Luft'     => $location_info['tt'] ?? null,
        // Hier wird der Objektname (z.B. "brienz") als String für die Spalte location_id verwendet
        'location_id' => $location_key 
    ];
}


// print_r($data); // Zum Debuggen: Ausgabe des transformierten Arrays
// echo "<br><br>";
// print_r($transformedData); // Zum Debuggen: Ausgabe des transformierten Arrays

// Kodiert die transformierten Daten in JSON

// Gibt die JSON-Daten zurück, anstatt sie auszugeben
?>