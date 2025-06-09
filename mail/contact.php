<?php
if(
    empty($_POST['name']) || empty($_POST['email']) ||
    !filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)
) {
  http_response_code(500);
  exit();
}

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$lastname = isset($_POST['lastname']) ? strip_tags(htmlspecialchars($_POST['lastname'])) : '';
$location_type = isset($_POST['location_type']) ? $_POST['location_type'] : '';

// Default values
$from_address = '';
$postcode1 = '';
$to_address = '';
$postcode = '';

if ($location_type === 'one') {
    $from_address = isset($_POST['from_address']) ? strip_tags(htmlspecialchars($_POST['from_address'])) : '';
    $postcode1 = isset($_POST['postcode1']) ? strip_tags(htmlspecialchars($_POST['postcode1'])) : '';
} elseif ($location_type === 'two') {
    $from_address = isset($_POST['from_address']) ? strip_tags(htmlspecialchars($_POST['from_address'])) : '';
    $postcode1 = isset($_POST['postcode1']) ? strip_tags(htmlspecialchars($_POST['postcode1'])) : '';
    $to_address = isset($_POST['to_address']) ? strip_tags(htmlspecialchars($_POST['to_address'])) : '';
    $postcode = isset($_POST['postcode']) ? strip_tags(htmlspecialchars($_POST['postcode'])) : '';
}

$from_floor = isset($_POST['from_floor']) ? strip_tags(htmlspecialchars($_POST['from_floor'])) : '';
$to_floor = isset($_POST['to_floor']) ? strip_tags(htmlspecialchars($_POST['to_floor'])) : '';
$time = isset($_POST['time']) ? strip_tags(htmlspecialchars($_POST['time'])) : '';
$date = isset($_POST['date']) ? strip_tags(htmlspecialchars($_POST['date'])) : '';
$move_price = isset($_POST['move_price']) ? strip_tags(htmlspecialchars($_POST['move_price'])) : '';
$phone = isset($_POST['phone']) ? strip_tags(htmlspecialchars($_POST['phone'])) : '';
$message = isset($_POST['message']) ? strip_tags(htmlspecialchars($_POST['message'])) : '';

$to = "info@liederserivce.be"; // Change this email to your //
$subject = "Nieuw contactformulier van $name $lastname";
$body = "U heeft een nieuw bericht ontvangen van het contactformulier op uw website.\n\n";
$body .= "Gegevens klant:\n";
$body .= "Naam: $name\n";
$body .= "Achternaam: $lastname\n";
$body .= "E-mail: $email\n";
$body .= "Telefoonnummer: $phone\n";
if ($location_type === 'one') {
    $body .= "Adres: $from_address\n";
    $body .= "Postcode: $postcode1\n";
} elseif ($location_type === 'two') {
    $body .= "Adres van vertrek: $from_address\n";
    $body .= "Postcode vertrek: $postcode1\n";
    $body .= "Verhuizen Naar: $to_address\n";
    $body .= "Postcode bestemming: $postcode\n";
}
$body .= "Van Verdieping: $from_floor\n";
$body .= "Naar Verdieping: $to_floor\n";
$body .= "Datum: $date\n";
$body .= "Tijd: $time\n";
$body .= "Prijs verhuis: $move_price\n";
$body .= "Bericht:\n$message\n";

$headers = "From: $email\r\n";
$headers .= "Reply-To: $email\r\n";

if(!mail($to, $subject, $body, $headers)) {
  http_response_code(500);
  exit();
}
http_response_code(200);
?>
