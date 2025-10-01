*/muss alles noch angepasst werden!/* habe es nur rüberkopiert.

<?php
$data = [
    'firstname' => 'Sara',
    'lastname' => 'Imthurn',
    'email' => 's-oso@bluewin.ch'
];

require_once 'config.php';

try {
    // Erstellt eine neue PDO-Instanz mit der Konfiguration aus config.php
    $pdo = new PDO($dsn, $username, $password, $options);

    // SQL-Query mit Platzhaltern für das Einfügen von Daten
    $sql = "INSERT INTO User (firstname, lastname, email) VALUES (?, ?, ?)"; //die ? sind Platzhalter für die Daten

    // Bereitet die SQL-Anweisung vor
    $stmt = $pdo->prepare($sql);

    // Fügt jedes Element im Array in die Datenbank ein
   
    $stmt->execute([
        $data['firstname'], //Reihenfolge muss gleich sein wie in der SQL-Query!
        $data['lastname'],
        $data['email']
        ]);

    echo "Daten erfolgreich eingefügt.";
} catch (PDOException $e) {
    die("Verbindung zur Datenbank konnte nicht hergestellt werden: " . $e->getMessage());
}
?>