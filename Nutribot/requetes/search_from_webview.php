<ul class="listrap">
  <?php
$a = 0;
$gros_tab = array();
//function debu
$marque1 = $_GET["produit"];
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
  $code = $tab_openFoodFacts["products"][$key]["code"];
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
  //$limage = "http://www.arcateste.com/glucido/requetes/convert_image.php?nutriscore=".$nutrition_grades_tags."&mcx=".$morceaux."&kcal=".$kcal."&url_thumb=".$url_thumb;
  $id = $tab_openFoodFacts["products"][$key]["_id"];
  $link = "https://fr.openfoodfacts.org/product/".$id;
  $ingredients = $tab_openFoodFacts["products"][$key]["ingredients_text"];
  ?>
  <li>
      <div class="listrap-toggle">
          <span></span>
          <img src="<?php echo $url_thumb; ?>" alt="<?php echo $code; ?>" class="img-circle" style="max-width:60px;min-width:60px;max-height:60px;min-height:60px" />
      </div>
      <strong><?php echo $product_name; ?></strong>
  </li>
  <?php


      if($a == 15){
        break;
      }
    $a++;
}

if($a == 0) {
  ?>
  <li class="inclicable" style="text-align:center">
      <strong>Aucun produit trouvé ! Veuillez recommencer.</strong>
  </li>
  <?php
}



  //Afficher le tab
  $timestamp_fin = microtime(true);

// différence en millisecondes entre le début et la fin
$difference_ms = $timestamp_fin - $timestamp_debut;



?>
</ul>
<script>
$(function() {
  $( "ul.listrap li" ).click(function() {
    if($(this).hasClass("inclicable")) {

    }
    else {


    if($(this).hasClass("active")) {
      $(this).removeClass("active");
      $( ".fixed-nav" ).hide();
    }else {
      if($( "ul.listrap li" ).hasClass("active")) {
          $("ul.listrap li").removeClass("active");
          $(this).addClass('active');
          $( ".fixed-nav" ).show();
          // ajouter lurl de limage dans un input
          var src = $(this).find('img').attr("src");
          var codez = $(this).find('img').attr("alt");
          $('#imageurl').val(src);
          $('#codez').val(codez);


      }else {
          $(this).addClass('active');
          $( ".fixed-nav" ).show();
          var src = $(this).find('img').attr("src");
          var codez = $(this).find('img').attr("alt");
          $('#imageurl').val(src);
          $('#codez').val(codez);
      }
    }

    }
  });
});
</script>
