<?php

	$post_data = json_decode(file_get_contents('php://input'), true);

	$dirt = $post_data['directory'];
	//console_log( $dirt );
	$name = "../".$dirt."/".$post_data['filename']; 
	//$name = $dirt."/".$post_data['filename'].".txt"; 
	$data = $post_data['filedata'];

	file_put_contents($name, $data);
?>