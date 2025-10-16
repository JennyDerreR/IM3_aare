<?php
require_once 'config.php'; // Stellen Sie sicher, dass dies auf Ihre tatsächliche Konfigurationsdatei verweist
header('Content-Type: application/json; charset=utf-8'); //sagt dem Browser, dass die kommenden Daten in JSON dargestellt werden sollen

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    //Zeitraum aus Request lesen
    $range = $_GET['range'] ?? 'today'; // Standardwert ist 'today'
    $startDate = $_GET['startDate'] ?? null;
    $endDate = $_GET['endDate'] ?? null;

    //Daten berechnen, falls kein Custom-Range angegeben ist
    $today = new DateTime();
    $from = null;
    $to = $today->format('Y-m-d');

    switch ($range) {
        case 'yesterday':
            $from = (clone $today)->modify('-1 day')->format('Y-m-d');
            $to = $from;
            break;
        case 'last_week':
            $from = (clone $today)->modify('-7 days')->format('Y-m-d');
            break;
        case 'last_month':
            $from = (clone $today)->modify('-1 month')->format('Y-m-d');
            break;
        case 'custom':
            if ($startDate && $endDate) {
                $from = $startDate;
                $to = $endDate;
            } else {
                throw new Exception('Fehlender Start- oder Endzeitraum für Custom Range');
            }
            break;
        default:
            $from = $today->format('Y-m-d');
            break;
    }

    //Query für Tagesdurchschnitt pro Stadt im Zeitraum
    $sql = "
        SELECT
            location_id,
            DATE(Timestamp) as date,
            ROUND(AVG(flow), 2) as avg_flow,
        FROM Aare_Jenny_Sara
        WHERE DATE(Timestamp) BETWEEN :from AND :to
        GROUP BY location_id, DATE(Timestamp)
        ORDER BY date DESC, location_id
    ";

    $stmt = $pdo->prepare($sql);
    $stmt->bidnParam(':from', $from);
    $stmt->bindParam(':to', $to);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($results, JSON_PRETTY_PRINT);

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]); 
}