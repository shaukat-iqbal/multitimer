<?php
include("./config.php");
class Group
{
    private $id;
    private $label;
    private $postion;
    private $width;
    private $height;
    private $timers;
    private $pdo;
    function __construct($id = null, $label = "", $postion = null, $width = 0, $height = 0, $timers = null)
    {
        try {
            $connString = "mysql:host=localhost;dbname=multitimer";
            $this->pdo = new PDO($connString, DBUSER, DBPASSWORD);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            $this->id = $id;
            $this->label = $label;
            $this->postion = $postion;
            $this->width = $width;
            $this->height = $height;
            $this->timers = $timers;
        } catch (\Throwable $th) {
            //throw $th;
            echo "Could not connect";
        }
    }

    public function getAllGroups()
    {
        $groups = array();
        # code...
        try {
            $sql = "Select * from groups";
            $result = $this->pdo->query($sql);
            while ($row = $result->fetch()) {
                $timer = new Group($row["id"], $row["label"], $row["position"], $row["width"], $row["height"], unserialize($row["timers"]));
                array_push($groups, $timer);
            }
        } catch (\Throwable $th) {
            echo $th;
        }
        return $groups;
    }
}
