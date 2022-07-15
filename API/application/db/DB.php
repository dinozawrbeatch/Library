<?php
class DB
{
    function __construct()
    {
        $host = 'localhost';
        $port = '3306';
        $name = 'library';
        $user = 'root';
        $pass = '';
        $this->siteLink = 'http://library';
        try {
            $this->db = new PDO(
                'mysql:' .
                'host=' . $host . ';' .
                'port=' . $port . ';' .
                'dbname=' . $name,
                $user,
                $pass
                );
        }
        catch (Exception $e) {
            print_r($e->getMessage());
            die();
        }
    }

    public function getType($id){
        $query = "SELECT * FROM types WHERE id = '$id'";
        return $this->db->query($query)
            ->fetchObject();
    }

    public function getCategory($id){
        $query = "SELECT * FROM categories WHERE id = '$id'";
        return $this->db->query($query)
            ->fetchObject();
    }

    public function getMaterial($id){
        $query = "SELECT materials.title, 
                    materials.author, 
                    materials.description, 
                    types.name AS type, 
                    categories.name AS category 
                    FROM `materials`, types, categories
                    WHERE materials.id = $id
                    AND materials.id_type = types.id 
                    AND materials.id_category = categories.id";
        return $this->db->query($query)
            ->fetchObject();
    }

    public function getTag($id){
        $query = "SELECT * FROM tags WHERE id = $id";
        return $this->db->query($query)
            ->fetchObject();
    }

    public function getLink($id){
        $query = "SELECT * FROM links WHERE id = $id";
        return $this->db->query($query)
            ->fetchObject();
    }
    public function getTagToMaterial($tag_id, $material_id){
        $query = "SELECT * FROM tags_to_materials 
                WHERE tag_id = $tag_id
                AND material_id = $material_id";
        return $this->db->query($query)
            ->fetchObject();
    }
    
    public function getAllMaterials(){
        $query = "SELECT materials.id,
                materials.title, 
                materials.author, 
                categories.name AS category, 
                materials.description, 
                types.name AS type 
                FROM materials, types, categories 
                WHERE types.id = materials.id_type 
                AND categories.id = materials.id_category";
        return $this->db->query($query)
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addMaterial($type_id, $category_id, $title, $author, $description){
        $query = "INSERT INTO `materials`
        (`title`, `author`, `id_type`, `id_category`, `description`) 
        VALUES ('$title', '$author', $type_id, $category_id, '$description')";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function findMaterial($str){
        $query = "SELECT materials.id,
        materials.title,
        materials.author,
        materials.description,
        types.name      AS type,
        categories.name AS category
 FROM materials
          LEFT JOIN categories
                    ON materials.id_category = categories.id
          LEFT JOIN types
                    ON materials.id_type = types.id
          LEFT JOIN tags_to_materials
                    ON materials.id = tags_to_materials.material_id
          LEFT JOIN tags
                    ON tags.id = tags_to_materials.tag_id
 WHERE materials.id IN (
     SELECT materials.id
     FROM materials
              LEFT JOIN categories
                        ON materials.id_category = categories.id
              LEFT JOIN types
                        ON materials.id_type = types.id
              LEFT JOIN tags_to_materials
                        ON materials.id = tags_to_materials.material_id
              LEFT JOIN tags
                        ON tags.id = tags_to_materials.tag_id
     WHERE materials.author LIKE '$str%'
        OR materials.title LIKE '$str%'
        OR categories.name LIKE '$str%'
        OR tags.name LIKE '$str%' group by materials.id)";
        return $this->db->query($query)
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addCategory($name){
        $query = "INSERT INTO categories (name) VALUES ('$name')";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function getTypes(){
        $query = "SELECT * FROM types";
        return $this->db->query($query)
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteMaterial($id){
        $query = "DELETE FROM materials WHERE id = $id";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function updateMaterial($id, $type, $category, $title, $author, $description){
        $query = "UPDATE materials
            SET 
            id_type = $type,
            id_category = $category,
            title = '$title',
            author = '$author',
            description = '$description'
            WHERE id = $id";
            $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function getTags(){
        $query = "SELECT * FROM tags";
        return $this->db->query($query)
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addTagToMaterial($tag_id, $material_id){
        $query = "INSERT INTO tags_to_materials(`tag_id`, `material_id`)
                VALUES ('$tag_id','$material_id')";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;   
    }

    public function getMaterialTags($material_id){
        $query = "SELECT tags.id,
                tags.name 
                FROM tags
                INNER JOIN tags_to_materials
                ON tags.id = tags_to_materials.tag_id
                WHERE tags_to_materials.material_id = $material_id";
        return $this->db->query($query)
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteTagMaterial($tag_id, $material_id){
        $query = "DELETE FROM tags_to_materials 
                WHERE tag_id = $tag_id 
                AND material_id = $material_id";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function getMaterialsByTag($tag_id){
        $query = "SELECT materials.id,
                materials.title, 
                materials.author, 
                materials.description, 
                types.name AS type, 
                categories.name AS category 
                FROM materials, tags_to_materials, types, categories 
                WHERE tags_to_materials.tag_id = $tag_id
                AND materials.id = tags_to_materials.material_id 
                AND materials.id_type = types.id 
                AND materials.id_category = categories.id";
        return $this->db->query($query)
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function getMaterialLinks($material_id){
        $query = "SELECT *
                FROM links 
                WHERE material_id = $material_id";
        return $this->db->query($query)
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteLinkMaterial($id){
        $query = "DELETE FROM links WHERE id = $id";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function addLinkToMaterial($material_id, $signature, $link){
        $query = "INSERT INTO links
                (signature, link, material_id) 
                VALUES 
                ('$signature','$link','$material_id')";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function updateLink($id, $signature, $link, $material_id){
        $query = "UPDATE links
                SET signature = '$signature',
                link = '$link'
                WHERE id = $id";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function deleteTag($id){
        $query = "DELETE FROM tags WHERE id = $id";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }
    
    public function addTag($name){
        $query = "INSERT INTO tags (name) VALUES ('$name')";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function updateTag($id, $name){
        $query = "UPDATE tags SET name = '$name' WHERE id= $id";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function getCategories(){
        $query = "SELECT * FROM categories";
        return $this->db->query($query)
            ->fetchAll(PDO::FETCH_ASSOC);
    }

    public function deleteCategory($id){
        $query = "DELETE FROM categories WHERE id = $id";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }

    public function updateCategory($id, $name){
        $query = "UPDATE categories SET name = '$name' WHERE id = $id";
        $result = $this->db->query($query);
        if($result->rowCount() == 0)
            return false;
        return true;
    }
}