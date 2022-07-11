<?php
class Link
{   
    function __construct($db){
        $this->db = $db;
    }

    public function getMaterialLinks($material_id){
        $material = $this->db->getMaterial($material_id);
        if($material)
            return $this->db->getMaterialLinks($material_id);
    }

    public function deleteLinkMaterial($id){
        $link = $this->db->getLink($id);
        if($link)
            return $this->db->deleteLinkMaterial($id);
    }

    public function addLinkToMaterial($material_id, $signature, $link){
        $material = $this->db->getMaterial($material_id);
        if($material && filter_var($link, FILTER_VALIDATE_URL))
            return $this->db->addLinkToMaterial($material_id, $signature, $link);
    }

    public function updateLink($id, $signature, $link, $material_id){
        $isLink = $this->db->getLink($id);
        $material = $this->db->getMaterial($material_id);
        if($isLink && $material && filter_var($link, FILTER_VALIDATE_URL))
            return $this->db->updateLink($id, $signature, $link, $material_id);
    }
}