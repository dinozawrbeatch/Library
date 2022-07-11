<?php
header('Access-Control-Allow-Origin: *');
header("Content-type: application/json; charset=utf-8");

error_reporting(-1);
require_once('application/Application.php');

function router($params){
    $method = $params['method'];
    if($method){
        $app = new Application();
        switch($method){
            case 'updateMaterial': return $app->updateMaterial($params);
            case 'addMaterial': return $app->addMaterial($params);
            case 'findMaterial': return $app->findMaterial($params);
            case 'addCategory': return $app->addCategory($params);
            case 'getTypes': return $app->getTypes();
            case 'deleteMaterial': return $app->deleteMaterial($params);
            case 'getAllMaterials': return $app->getAllMaterials();
            case 'getMaterial': return $app->getMaterial($params);
            case 'getTags': return $app->getTags();
            case 'addTagToMaterial': return $app->addTagToMaterial($params);
            case 'getMaterialTags': return $app->getMaterialTags($params);
            case 'deleteTagMaterial': return $app->deleteTagMaterial($params);
            case 'getMaterialsByTag': return $app->getMaterialsByTag($params);
            case 'addTag': return $app->addTag($params);
            case 'getMaterialLinks': return $app->getMaterialLinks($params);
            case 'deleteLinkMaterial': return $app->deleteLinkMaterial($params);
            case 'addLinkToMaterial': return $app->addLinkToMaterial($params);
            case 'updateLink': return $app->updateLink($params);
            case 'deleteTag': return $app->deleteTag($params);
            case 'updateTag': return $app->updateTag($params);
            case 'getTag': return $app->getTag($params);
            case 'getCategories': return $app->getCategories();
            case 'deleteCategory': return $app->deleteCategory($params); 
            case 'getCategory': return $app->getCategory($params);
            case 'updateCategory': return $app->updateCategory($params);
        }
        return false;
    }
}

function answer($data){
    if($data){
        return array(
            'result' => 'ok',
            'data' => $data
        );
    } else {
        return array('result' => 'error');
    }
}

echo json_encode(answer(router(array_merge($_GET,$_POST))));

