<?php
$gros_tab = array();
//function debu
$code = trim($_GET["code"]);
$tab_infos = array();

  $jsonurl = "https://fr.openfoodfacts.org/api/v0/product/".$code.".json";
  //echo $jsonurl;
  $first = file_get_contents($jsonurl);
  $tab_openFoodFacts = json_decode($first, true);
  //echo '<pre>',print_r($tab_openFoodFacts,1),'</pre>';
$tab_cat = array();
$nutriscore = "";
$premier_produit = $tab_openFoodFacts["product"];

  $nutrition_grades_tags = $premier_produit["nutrition_grade_fr"];
  $nutriscore = $premier_produit["nutrition_grade_fr"];
//  echo $nutriscore;
  $nutrition_data_per = $premier_produit["nutrition_data_per"];
  $sugars_100g = $premier_produit["nutriments"]["sugars_100g"];
  $kj = $premier_produit["nutriments"]["energy_100g"];
  $unit = $premier_produit["nutriments"]["energy_unit"];
  $kcal = round($kj/4.1868);
  $url_thumb = $premier_produit["image_front_url"];
  $qte = round($sugars_100g/4);
  if($qte <= 0)
  {
    $morceaux = 0;
  } else {
    $morceaux = $qte;
  }
  $product_name = $premier_produit["product_name"];
  //echo $product_name;
  if(!$nutrition_grades_tags || !$url_thumb || !$morceaux || !$kcal) {
    $limage = "https://mon-chatbot.com/nutribot2018/logo.png";
  }else {
    $limage = "http://www.arcateste.com/glucido/requetes/convert_image.php?nutriscore=".$nutrition_grades_tags."&mcx=".$morceaux."&kcal=".$kcal."&url_thumb=".$url_thumb;
  }
    $id = $premier_produit["_id"];
  $link = "https://fr.openfoodfacts.org/product/".$id;
  $ingredients = $premier_produit["ingredients_text"];
  $cats = $premier_produit["categories"];
  $tab_cats = explode(",", $cats);
  foreach($tab_cats as $cat) {
   array_push($tab_cat, $cat);
  }




$tab_infos2 = [
  "title" => "➡️ Produits plus sains",
  "image_url" => "https://mon-chatbot.com/nutribot2018/images/nutriscore-good.jpg",
  "subtitle" => "Découvrez ci-après une liste de produits de la même catégorie avec une meilleure note nutritionelle."
];
$gros_tab[0] = $tab_infos2;

// création de l'url de recherche avec toutes les catégories et le nutriscore
$nurl = "https://fr.openfoodfacts.org/cgi/search.pl?action=process";
$z = 0;
$tab_cat = array_reverse($tab_cat);
foreach($tab_cat as $cat) {
  $cat = rawurlencode($cat);
  if($z == 3) {
    $z++;
    break;
  }else {
      $nurl .= '&tagtype_'.$z.'=categories&tag_contains_'.$z.'=contains&tag_'.$z.'='.$cat;
    $z++;
  }
}

//echo "NUTTT".$nutriscore.'<br />';
if($nutriscore == "e") {
  $tab_nut = array("a", "b", "c", "d");
}
else if($nutriscore == "d") {
  $tab_nut = array("a", "b", "c");
}
else if($nutriscore == "c") {
  $tab_nut = array("a", "b");
}
else if($nutriscore == "b") {
  $tab_nut = array("a");
}
else {
  $tab_nut = array("a");
}

$reste = 0;
$v = 0;
$depart = 1;
// tant que reste <= 7, on fait des recherchers
foreach($tab_nut as $nut) {
  //echo 'TABnut'.$nut.'<br />';
  $nurl .= '&tagtype_'.$z.'=nutrition_grades&tag_contains_'.$z.'=contains&tag_'.$z.'='.$nut;
  $nurl .= '&sort_by=unique_scans_n&page_size=20&axis_x=energy&axis_y=products_n&action=display';
//  echo $nurl.'<br />';

  $first = file_get_contents($nurl.'&search_simple=1&action=process&json=1');
  $tab_openFoodFacts = json_decode($first, true);
  //echo '<pre>',print_r($tab_openFoodFacts,1),'</pre>';

  foreach ($tab_openFoodFacts["products"] as $key => $value)  {
    # code...
    $nutrition_grades_tags = $tab_openFoodFacts["products"][$key]["nutrition_grade_fr"];
    $nutriscore = $tab_openFoodFacts["products"][$key]["nutrition_grade_fr"];
    //echo $nutriscore;
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
    //echo $product_name;
    $limage = "http://www.arcateste.com/glucido/requetes/convert_image.php?nutriscore=".$nutrition_grades_tags."&mcx=".$morceaux."&kcal=".$kcal."&url_thumb=".$url_thumb;
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

      if($depart <= 7 &&  in_array($nutriscore, $tab_nut)) {
        $gros_tab[$depart] = $tab_infos2;
        $depart++;
      }else {

      }

      if($depart == 8) {
          break;
      }

    }
  }
  // ajoutons dans le tableau
  // reste ++ à chaque fois

}

if($depart == 1) {

  $tab_infos2 = [
    "title" => "Aucun produit trouvé",
    "image_url" => "https://mon-chatbot.com/nutribot2018/images/nutriscore-good.jpg",
    "subtitle" => "Je n'ai pas reussi à vous trouver de produits plus sains pour votre santé."
  ];
  $gros_tab[0] = $tab_infos2;

}

  $response = [
  				"attachment" => array(
  					"type" => "template",
  					"payload" => array(
  						"template_type" => "generic",
  						"elements" => $gros_tab
        ))];

      echo json_encode($response, JSON_UNESCAPED_SLASHES);

  //Afficher le tab
  $timestamp_fin = microtime(true);

// différence en millisecondes entre le début et la fin
$difference_ms = $timestamp_fin - $timestamp_debut;



?>
