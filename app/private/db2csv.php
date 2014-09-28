<?php

    require_once 'REST/db.php';
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);


    // check connection
    if ($conn->connect_error) {
        trigger_error('Database connection failed: ' . $conn->connect_error, E_USER_ERROR);
    }

    $sql = "SELECT company_name, street, city, state, zip FROM tblCompanies WHERE region = 'Northeast' OR region = 'Southeast' OR region = 'Gulf Coast'";
    $rs = $conn->query($sql) or die($conn->error . __LINE__);
    $rtn = array();
    if (!$rs) {
        trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
    } else {
        $fields = $rs->fetch_fields();
        $header = '';
        $data = '';

        for ($i = 0; $i < count($fields); $i++ ) {
            $header .= $fields[$i]->orgname . ",";
        }

        while($row = $rs->fetch_row()) {
            $line = '';
            foreach($row as $value) {
                if ( (!isset($value)) || ($value == "") ) {
                    $value = ",";
                }
                else {
                    $value = str_replace('"' , '""' , $value);
                    $value = '"' . $value . '"' . ",";
                }
                $line .= $value;
            }
            //echo $line . '<br />';
            $data .= trim($line) . "\n";
        }
        $data = str_replace( "\r" , "" , $data );

        if ($data == "") {
            $data = "\n(0) Records Found!\n";
        }

        //var_dump($data);

        header("Content-type: application/octet-stream");
        header("Content-Disposition: attachment; filename=east_coast_companies.csv");
        header("Pragma: no-cache");
        header("Expires: 0");
        print "$header\n$data";
    }
?>