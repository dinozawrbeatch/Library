<?php
class Material
{
    function __construct($db){
        $this->db = $db;
    }

    public function addMaterial($type, $category, $title, $author, $description){
        $type = $this->db->getType($type);
        $category = $this->db->getCategory($category);
            return $this->db->addMaterial($type->id, $category->id, $title, $author, $description);
    }

    public function findMaterial($str){
        if(strlen($str) >= 1){
            return $this->db->findMaterial($str);
        }
    }

    public function deleteMaterial($id){
        $material = $this->db->getMaterial($id);
        if($material)
            return $this->db->deleteMaterial($id);
    }

    public function updateMaterial($id, $type, $category, $name, $author, $description){
        $material = $this->db->getMaterial($id);
        $type = $this->db->getType($type);
        $category = $this->db->getCategory($category);
        if($material)
            return $this->db->updateMaterial($id, $type->id, $category->id, $name, $author, $description);
    }

    public function addTagToMaterial($tag_id, $material_id){
        $tagToMaterial = $this->db->getTagToMaterial($tag_id, $material_id);
        $tag = $this->db->getTag($tag_id);
        $material = $this->db->getMaterial($material_id);
        if(!$tagToMaterial && $tag && $material){
            return $this->db->addTagToMaterial($tag_id, $material_id);
        }
    }

    public function getMaterialTags($material_id){
        $material = $this->db->getMaterial($material_id);
        if($material)
            return $this->db->getMaterialTags($material_id);
    }

    public function deleteTagMaterial($tag_id, $material_id){
        $tag = $this->db->getTag($tag_id);
        $material = $this->db->getMaterial($material_id);
        if($tag && $material)
            return $this->db->deleteTagMaterial($tag_id, $material_id);
    }

    public function getMaterialsByTag($tag_id){
        $tag = $this->db->getTag($tag_id);
        if($tag)
            return $this->db->getMaterialsByTag($tag_id);
    }
}