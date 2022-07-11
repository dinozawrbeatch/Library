<?php

require_once('db/DB.php');
require_once('material/Material.php');
require_once('category/Category.php');
require_once('tag/Tag.php');
require_once('link/Link.php');
class Application
{
    public function __construct()
    {
        $db = new DB();
        $this->db = $db;
        $this->material = new Material($db);
        $this->category = new Category($db);
        $this->tag = new Tag($db);
        $this->link = new Link($db);
    }

    public function findMaterial($params){
        $str = $params['str'];
        if($str) 
            return $this->material->findMaterial($str);
    }

    public function addCategory($params){
        $name = $params['name'];
        if($name){
            return $this->category->addCategory($name);
        }
    }

    public function getTypes(){
        return $this->db->getTypes();
    }

    public function deleteMaterial($params){
        $id = $params['id'];
        if($id)
            return $this->material->deleteMaterial($id);
    }

    public function updateMaterial($params){
        $id = $params['id'];
        $type = $params['type'];
        $category = $params['category'];
        $title = $params['title'];
        $author = $params['author'];
        $description = $params['description'];
        if($type && $category && $title)
            return $this->material->updateMaterial($id, $type, $category, $title, $author, $description);
    }

    public function addMaterial($params){
        $type = $params['type'];
        $category = $params['category'];
        $title = $params['title'];
        $author = $params['author'];
        $description = $params['description'];
        if($type && $category && $title)
            return $this->material->addMaterial($type, $category, $title, $author, $description);
    }

    public function getAllMaterials(){
        return $this->db->getAllMaterials();
    }

    public function getMaterial($params){
        $id = $params['id'];
        if($id)
            return $this->db->getMaterial($id);
    }

    public function getTags(){
        return $this->db->getTags();
    }

    public function addTagToMaterial($params){
        $tag_id = $params['tag_id'];
        $material_id = $params['material_id'];
        if($tag_id && $material_id)
            return $this->material->addTagToMaterial($tag_id, $material_id);

    }

    public function getMaterialTags($params){
        $material_id = $params['material_id'];
        if($material_id)
            return $this->material->getMaterialTags($material_id);
    }

    public function deleteTagMaterial($params){
        $tag_id = $params['tag_id'];
        $material_id = $params['material_id'];
        if($tag_id && $material_id)
            return $this->material->deleteTagMaterial($tag_id, $material_id);
    }

    public function getMaterialsByTag($params){
        $tag_id = $params['tag_id'];
        if($tag_id)
            return $this->material->getMaterialsByTag($tag_id);
    }

    public function addTag($params){
        $name = $params['name'];
        if($name)
            return $this->tag->addTag($name);
    }

    public function getMaterialLinks($params){
        $material_id = $params['material_id'];
        if($material_id)
            return $this->link->getMaterialLinks($material_id);
    }

    public function deleteLinkMaterial($params){
        $id = $params['id'];
        if($id)
            return $this->link->deleteLinkMaterial($id);
    }

    public function addLinkToMaterial($params){
        $material_id = $params['material_id'];
        $signature = $params['signature'];
        $link = $params['link'];
        if($material_id && $link)
            return $this->link->addLinkToMaterial($material_id, $signature, $link);
    }

    public function updateLink($params){
        $id = $params['id'];
        $signature = $params['signature'];
        $link = $params['link'];
        $material_id = $params['material_id'];
        if($id && $link && $material_id)
            return $this->link->updateLink($id, $signature, $link, $material_id);
    }

    public function deleteTag($params){
        $id = $params['id'];
        if($id)
            return $this->tag->deleteTag($id);
    }

    public function updateTag($params){
        $id = $params['id'];
        $name = $params['name'];
        if($id && $name)
            return $this->tag->updateTag($id, $name);
    }

    public function getTag($params){
        $id = $params['id'];
        if($id)
            return $this->db->getTag($id);
    }

    public function getCategories(){
        return $this->db->getCategories();
    }

    public function deleteCategory($params){
        $id = $params['id'];
        if($id)
            return $this->category->deleteCategory($id); 
    }

    public function getCategory($params){
        $id = $params['id'];
        if($id)
            return $this->category->getCategory($id); 
    }

    public function updateCategory($params){
        $id = $params['id'];
        $name = $params['name'];
        if($id && $name)
            return $this->category->updateCategory($id, $name);
    }
}