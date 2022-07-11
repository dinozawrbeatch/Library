<?php
class Tag
{
    function __construct($db){
        $this->db = $db;
    }

    public function addTag($name){
        if(trim($name) !== '')
            return $this->db->addTag(trim($name));
    }

    public function deleteTag($id){
        $tag = $this->db->getTag($id);
        if($tag)
            return $this->db->deleteTag($id);
    }

    public function updateTag($id, $name){
        $tag = $this->db->getTag($id);
        if($tag)
            return $this->db->updateTag($id, $name);
    }
}