<?php
$a = 0;
$gros_tab = array();
//function debu


$tempData = html_entity_decode($_GET["result"]);
$cleanData = json_decode($tempData, true);
$code = $cleanData["codeResult"]["code"];


if($code) {

$tab_infos = array();
  // https://fr.openfoodfacts.org/api/v0/produit/5060193933863.json
  $jsonurl = "https://fr.openfoodfacts.org/api/v0/produit/".$code.".json";
  $first = file_get_contents($jsonurl);
  $tab_openFoodFacts = json_decode($first, true);
  //echo '<pre>',print_r($tab_openFoodFacts,1),'</pre>';

  $product_name = $tab_openFoodFacts["product"]["product_name"];
  $nutrition_grades_tags = $tab_openFoodFacts["product"]["nutrition_grades_tags"][0];
  $nutrition_data_per = $tab_openFoodFacts["product"]["nutrition_data_per"];
  $sugars_100g = $tab_openFoodFacts["product"]["nutriments"]["sugars_100g"];
  $kj = $tab_openFoodFacts["product"]["nutriments"]["energy_100g"];
  $unit = $tab_openFoodFacts["product"]["nutriments"]["energy_unit"];
  $url_thumb = $tab_openFoodFacts["product"]["image_front_url"];
  $id = $tab_openFoodFacts["product"]["_id"];
  $kcal = round($kj/4.1868);

  $qte = round($sugars_100g/4);
  if($qte <= 0)
  {
    $morceaux = 0;
  } else {
    $morceaux = $qte;
  }

  $product_name = $tab_openFoodFacts["product"]["product_name"];
  if(!$nutrition_grades_tags || !$url_thumb || !$morceaux || !$kcal) {
    $limage = "https://mon-chatbot.com/nutribot2018/logo.png";
  }else {
    $limage = "http://www.arcateste.com/glucido/requetes/convert_image.php?nutriscore=".$nutrition_grades_tags."&mcx=".$morceaux."&kcal=".$kcal."&url_thumb=".$url_thumb;
  }

  $link = "https://fr.openfoodfacts.org/product/".$id;
  $ingredients = $tab_openFoodFacts["product"]["ingredients_text"];
  $tab_infos2 = [

        "title" => $product_name,
        "image_url" => $limage,
        "subtitle" => $morceaux." morceau(x) de sucre / portion \n".$ingredients,
        "default_action" => array(
          "type" => "web_url",
          "url" => $link,
          "webview_height_ratio"=> "tall"
        ),
        "buttons" => [ array(
          "type"=>"web_url",
          "url"=> $link,
          "title"=> "🔍 Détails",
          "webview_height_ratio"=> "tall"
        )]
      ];

      $gros_tab[0] = $tab_infos2;

      if($tab_openFoodFacts["status_verbose"] !== 'product found') {
        $response = [
          "text"=> "Je n'ai rien trouvé pour ce produit "
        ];
      }

      else {
        $response = [
        				"attachment" => array(
        					"type" => "template",
        					"payload" => array(
        						"template_type" => "generic",
        						"elements" => $gros_tab
              ))];
            }
    }
    else {
      $response = [
        "text"=> "Je n'ai pas reussi à scanner votre produit. Veuillez bien zoomer et faire une photo claire s'il vous plaît."
      ];
    }






      echo json_encode($response, JSON_UNESCAPED_SLASHES);

  //Afficher le tab
  $timestamp_fin = microtime(true);

// différence en millisecondes entre le début et la fin
$difference_ms = $timestamp_fin - $timestamp_debut;



?>
