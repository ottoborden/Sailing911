<?php
    require_once 'db.php';
    $conn = new mysqli($db_host, $db_user, $db_pass, $db_name);

    // check connection
    if ($conn->connect_error) {
        trigger_error('Database connection failed: '  . $conn->connect_error, E_USER_ERROR);
    }

    $sql = $_GET['q'];
    $rs = $conn->query($sql) or die($conn->error.__LINE__);
    $rtn = array();
    if(!$rs) {
        trigger_error('Wrong SQL: ' . $sql . ' Error: ' . $conn->error, E_USER_ERROR);
    } else {
        while($arr = $rs->fetch_array(MYSQL_ASSOC)) {
            $rtn[] = $arr;
        }
        echo json_encode(utf8ize($rtn));
    }
    $rs->close();
    $conn->close();

    function utf8ize($d) {
        if (is_array($d)) {
            foreach ($d as $k => $v) {
                $d[$k] = utf8ize($v);
            }
        } else {
            return utf8_encode($d);
        }
        return $d;
    }
?>