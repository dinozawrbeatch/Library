<?php 
class Category
{
    function __construct($db){
        $this->db = $db;
    }

    public function addCategory($name){
        if(trim($name) != '')
            return $this->db->addCategory(trim($name));
    }

    public function deleteCategory($id){
        $category = $this->db->getCategory($id);
        if($category)
            return $this->db->deleteCategory($id); 
    }

    public function getCategory($id){
        $category = $this->db->getCategory($id);
        if($category)
            return $this->db->getCategory($id);
    }

    public function updateCategory($id, $name){
        $category = $this->db->getCategory($id);
        if($category && trim($name) != '')
            return $this->db->updateCategory($id, trim($name));
    }
}