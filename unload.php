<?php
/* ============================================================================
   HANDLUNGSANWEISUNG (unload.php)
   1) Setze Header: Content-Type: application/json; charset=utf-8.
   2) Binde 001_config.php (PDO-Config) ein.
   3) Lies optionale Request-Parameter (z. B. location, limit, from/to) und validiere.
   4) Baue SELECT mit PREPARED STATEMENT (WHERE/ORDER BY/LIMIT je nach Parametern).
   5) Binde Parameter sicher (execute([...]) oder bindValue()).
   6) Hole Datensätze (fetchAll) – optional gruppieren/umformen fürs Frontend.
   7) Antworte IMMER als JSON (json_encode) – auch bei leeren Treffern ([]) .
   8) Setze sinnvolle HTTP-Statuscodes (400 für Bad Request, 404 bei 0 Treffern (Detail), 200 ok).
   9) Fehlerfall: 500 + { "error": "..." } (keine internen Details leaken).
  10) Keine HTML-Ausgabe; keine var_dump in Prod.
   ============================================================================ */


require_once 'config.php'; // Stellen Sie sicher, dass dies auf Ihre tatsächliche Konfigurationsdatei verweist

header('Content-Type: application/json; charset=utf-8'); //sagt dem Browser, dass die kommenden Daten in JSON dargestellt werden sollen

try {
   $pdo = new PDO($dsn, $username, $password, $options);

   $sql = "SELECT * FROM Aare_Jenny_Sara ORDER BY Timestamp DESC";
   $stmt = $pdo -> prepare ($sql);
   $stmt -> execute();
   $results = $stmt -> fetchAll(PDO::FETCH_ASSOC);

   echo json_encode($results, JSON_PRETTY_PRINT);
}

catch (PDOException $e) {
   http_response_code(500);
   echo json_encode(['error' => 'Datenbankfehler.']);
   // In einer Produktionsumgebung sollten Sie keine internen Fehlerdetails preisgeben
   // error_log($e->getMessage()); // Loggen Sie den Fehler für die Entwickler
}