<?php
include("./config.php");
class Timer
{
    private $id;
    private $label;
    private $state;
    private $pdo;
    function __construct($id = null, $label = "", $state = "stopped")
    {
        try {
            $connString = "mysql:host=localhost;dbname=multitimer";
            $this->pdo = new PDO($connString, DBUSER, DBPASSWORD);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->label = $label;
            $this->state = $state;
            $this->id = $id;
        } catch (\Throwable $th) {
            //throw $th;
            echo "Could not connect";
        }
    }

    public function getAllTimers()
    {
        $timers = array();
        # code...
        try {
            $sql = "Select * from timers";
            $result = $this->pdo->query($sql);
            while ($row = $result->fetch()) {
                $timer = new Timer($row["id"], $row["label"], $row["status"]);
                array_push($timers, $timer);
            }
        } catch (\Throwable $th) {
            echo $th;
        }
        return $timers;
    }
}
