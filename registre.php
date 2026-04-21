<!DOCTYPE html>
<html>
    <head>
        <title>Inscripció Institut Marianao</title>
        <meta charset="utf-8">
        <link href="estils.css" rel="stylesheet" type="text/css">
    </head>
    <body> 
        <h1 id="titol">Inscripció a Cicles d'Informàtica</h1>
        <h2>Institut Marianao</h2>
        <?php
        if (isset($_POST['email'])) {
            define('DB_SERVER', 'localhost');
            define('DB_USERNAME', 'cfgs');
            define('DB_PASSWORD', 'sol19');
            define('DB_DATABASE', 'cfgs');
            $db = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_DATABASE);

            $nom = utf8_decode($_POST["nom"]);
            $cognom1 = utf8_decode($_POST["cognom1"]);
            $cognom2 = utf8_decode($_POST["cognom2"]);
            $data = $_POST["data_naix"];
            $mail = $_POST["email"];
            $tlf = $_POST["telefon"];
            $dni = $_POST["dni"];
            $dropdown = utf8_decode($_POST["cicle"]);
            $radio = utf8_decode($_POST["estudis"]);
            $usuari = utf8_decode($_POST["usuari"]);
            $passwd1 = $_POST["password"];
            $encryptPassword = password_hash($passwd1, PASSWORD_DEFAULT);
            $textarea = utf8_decode($_POST["observacions"]);

            $stmt = $db->prepare("SELECT MAIL FROM register WHERE MAIL = ?");
            $stmt->bind_param("s", $mail);
            $stmt->execute();
            $stmt->bind_result($userResult);
            $stmt->fetch();
            $stmt->close();

            if ($userResult == $mail) {
                echo "<section class='resultat'>";
                echo "<h3>Error: </h3>";
                echo "<p>Inscripció ja existeix. eMail: " . $mail . "</p>";
                echo "</section>";
            } else {
                $stmt = $db->prepare("INSERT INTO register(NOM, COGNOM1, COGNOM2, NAIXEMENT, MAIL, TELEFON, DNI, CICLEFORMATIU, ESTUDIS, USUARI, PASSWORD, OBSERVACIONS) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

                if (!$stmt) {
                    echo $db->error;
                }

                $stmt->bind_param("sssssissssss", $nom, $cognom1, $cognom2, $data, $mail, $tlf, $dni, $dropdown, $radio, $usuari, $encryptPassword, $textarea);
                $stmt->execute();
                $result = $stmt->affected_rows;
                $lit_err = $db->error;
                $stmt->close();
                $db->close();

                if ($result <= 0) {
                    echo "<section class='resultat'>";
                    echo "<h3>Error: </h3>";
                    echo "<p>Error a l'insertar registre a la BBDD: " . $lit_err . "</p>";
                    echo "</section>";
                } else {
                    echo "<section class='resultat'>";
                    echo "<h3>Inscripció correcta: </h3>";
                    echo "<strong>Nom usuari</strong>: " . $_POST['usuari'] . "<br>";
                    echo "<strong>Mail</strong>: " . $_POST['email'] . "<br>";
                    echo "</section>";
                }
            }
        } else {
            echo "<section class='resultat'>";
            echo "<h3>Error: </h3>";
            echo "<p>Error. Falten dades. " . $lit_err . "</p>";
            echo "</section>";
        }
        ?>
    </body>
</html>

