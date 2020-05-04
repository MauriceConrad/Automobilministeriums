<?php
  $clapsFile = "data/claps.txt";
  $client_ip = $_SERVER['REMOTE_ADDR'];

  $clapsNowStr = file_get_contents($clapsFile);

  $clientIPFile = "data/remote_addresses/" . $client_ip . ".txt";
  //$fileAddress = fopen($clientIPFile, "w+");


  try {
    $clapsPerIP = intval(file_get_contents($clientIPFile));
  }
  catch (Exception $e) {
    $clapsPerIP = 0;
  }

  try {
    $clapsNow = intval($clapsNowStr);
  }
  catch (Exception $e) {
    $clapsNow = 0;
  }

  $maxClapsPerIP = 50;

  if ($clapsPerIP <= $maxClapsPerIP) {
    $clapsPerIPNew = $clapsPerIP + 1;

    $fileAddress = fopen($clientIPFile, "w");

    fwrite($fileAddress, $clapsPerIPNew);
    fclose($fileAddress);




    $file = fopen($clapsFile, "w");

    $clapsNow = $clapsNow + 1;

    fwrite($file, $clapsNow);
    fclose($file);

    echo '{
      "success": true,
      "claps": ' . $clapsNow . ',
      "clapsPerIP": ' . $clapsPerIP . '
    }';
  }
  else {
    echo '{
      "success": false,
      "claps": ' . $clapsNow . ',
      "clapsPerIP": ' . $clapsPerIP . '
    }';
  }



?>
