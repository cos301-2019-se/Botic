<?php
  function pg_connection_string() {
    return "dbname=detua3tvjjqr5k host=ec2-174-129-10-235.compute-1.amazonaws.com port=5432 user=cyklqspuqrlzeo password=36b4c5aef1f947c29e90e87595329a51989965369a799d0166f09915f3eb118d sslmode=require";
  }

  function openCon() {
    # Establish db connection
    $db = pg_connect(pg_connection_string());
    if (!$db) {
      echo "Database connection error.";
      exit;
    }
    return $db;
  }
?>