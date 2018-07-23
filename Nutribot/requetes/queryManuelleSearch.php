<?php
$a = 0;
$gros_tab = array();
//function debu
$marque1 = $_GET["marque"];
$marque2 = str_replace(' ', '+', $marque1);
$tab_infos = array();

  $jsonurl = "https://fr.openfoodfacts.org/cgi/search.pl?search_terms=".$marque2."&search_simple=1&action=process&json=1";
  $first = file_get_contents($jsonurl);
  $tab_openFoodFacts = json_decode($first, true);
//  echo '<pre>',print_r($tab_openFoodFacts,1),'</pre>';
foreach ($tab_openFoodFacts["products"] as $key => $value) {
  $nutrition_grades_tags = $tab_openFoodFacts["products"][$key]["nutrition_grades_tags"][0];
  $nutrition_data_per = $tab_openFoodFacts["products"][$key]["nutrition_data_per"];
  $sugars_100g = $tab_openFoodFacts["products"][$key]["nutriments"]["sugars_100g"];
  $kj = $tab_openFoodFacts["products"][$key]["nutriments"]["energy_100g"];
  $unit = $tab_openFoodFacts["products"][$key]["nutriments"]["energy_unit"];
  $kcal = round($kj/4.1868);
  $url_thumb = $tab_openFoodFacts["products"][$key]["image_front_url"];
  $qte = round($sugars_100g/4);
  if($qte <= 0)
  {
    $morceaux = 0;
  } else {
    $morceaux = $qte;
  }
  $product_name = $tab_openFoodFacts["products"][$key]["product_name"];
  if(!$nutrition_grades_tags || !$url_thumb || !$morceaux || !$kcal) {
    $limage = "https://mon-chatbot.com/nutribot2018/logo.png";
  }else {
    $limage = "http://www.arcateste.com/glucido/requetes/convert_image.php?nutriscore=".$nutrition_grades_tags."&mcx=".$morceaux."&kcal=".$kcal."&url_thumb=".$url_thumb;
  }
    $id = $tab_openFoodFacts["products"][$key]["_id"];
  $link = "https://fr.openfoodfacts.org/product/".$id;
  $ingredients = $tab_openFoodFacts["products"][$key]["ingredients_text"];

      if($product_name) {
        $tab_infos2 = [
          "title" => $product_name,
          "image_url" => $limage,
          "subtitle" => $ingredients,
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

        $gros_tab[$a] = $tab_infos2;
        $a++;
      }

      if($a == 8){
        break;
      }

}





if($a == 0) {
  $response = [
    "text"=> "Je n'ai rien trouvé pour le produit : ".$marque1
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
      echo json_encode($response, JSON_UNESCAPED_SLASHES);

  //Afficher le tab
  $timestamp_fin = microtime(true);

// différence en millisecondes entre le début et la fin
$difference_ms = $timestamp_fin - $timestamp_debut;



?>
