<?php
//$dest = imagecreatefrompng('nutria.png');
//
$nutriscore = $_GET['nutriscore']; // a-b-c-d-e

$kcal = $_GET['kcal'];

if($kcal == null) {
  $kcal = "N.C";
}

$petite_photo = $_GET['url_thumb'];
list($width, $height) = getimagesize($petite_photo);
$src  = imagecreatefromjpeg($petite_photo);
if($nutriscore == "unknown") {
  $im = imagecreatefrompng("http://www.arcateste.com/glucido/images/nutriscore/c-g.png");
}
else {
  $im = imagecreatefrompng("http://www.arcateste.com/glucido/images/nutriscore/".$nutriscore."-g.png");
}
// if there's an error, stop processing the page:
if(!$im)
{
die("");
}

// define some colours to use with the image
$white = imagecolorallocate($im, 255, 255, 255);

// get the width and the height of the image
$width = imagesx($im);
$height = imagesy($im);

// now we want to write in the centre of the rectangle:


$font = './fira-sans-bold.ttf';

// Add the text

if($_GET['mcx'] == 0) {
  $mcx = "0 Morceau";
  imagettftext($im, 45, 0, 348, 481, $white, $font, $mcx);
  imagettftext($im, 55, 0, 845, 481, $white, $font, $kcal);
}else if($_GET['mcx'] == 1) {
  $mcx = "1 Morceau"; // store the text we're going to write in $text
  imagettftext($im, 45, 0, 348, 481, $white, $font, $mcx);
  imagettftext($im, 55, 0, 845, 481, $white, $font, $kcal);
}else {
  $mcx = $_GET['mcx']." Mcx"; // store the text we're going to write in $text
  imagettftext($im, 55, 0, 348, 481, $white, $font, $mcx);
  imagettftext($im, 55, 0, 845, 481, $white, $font, $kcal);
}
// output the image
// tell the browser what we're sending it
Header('Content-type: image/png');
// output the image as a png
imagecopy($im, $src, 217, 54, 0, 0, 221, 221);
imagepng($im);

// Copy


// tidy up
imagedestroy($im);
?>
