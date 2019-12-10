<?php 
$dir = "audio";
$list = scandir($dir); 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="css/all.css" rel="stylesheet">
    <link href="css/brands.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
    <link rel="stylesheet" href="css/main.css">
    <script defer src="js/all.js"></script>
    <title>Audio recorder</title>
</head>
<body>
    <div class="container text-white bg-black">
        <div class="container">
            <!-- <h1 class="text-centar">PLAYER</h1> -->
        </div>
        <div class="row p-1">
            <div class="col-12 col-sm-12 col-md-6 co-lg-6 col-xl-6">
                <div class="container-fluid   p-0" id="visuel"> 
                    <canvas id="canvas"></canvas>
                </div>
                <div class="container-fluid loader_div">
                <div class="bg-blue" id="loader"></div>
                </div>
                    <audio id="audioPlayer" src=""></audio>
                <div class="container-fluid border">
                   <div class="row p-2">
                    <div class="col-1"><span id="pback"><i class="fas fa-backward comm"></i></span></div>
                    <div class="col-2"><span id="pplay"><i class="far fa-play-circle comP"></i></span></div>
                    <div class="col-1"><span id="ppause"><i class="fas fa-pause comm"></i></span></div>
                    <div class="col-1"><span id="pstop"><i class="fas fa-stop comm"></i></span></div>
                    <div class="col-1"><span id="pforw"><i class="fas fa-forward comm"></i></span></div>
                    <div class="col-4 offset-1">
                        <input id="volumen" type="range" min="0" max="100" value="50">
                    </div>
                   </div>
                </div>
            </div>
            <div class="col-12 col-sm-12 col-md-6 co-l  g-6 col-xl-6">
               <ul class="list-group">
               <?php 
                  for($i = 2 ; $i < count($list); $i++) {  ?>
                <li class="list-group-item">
                    <?php echo $list[$i]; ?>
                </li>
                  <?php } ?>
               </ul>
            </div>
        </div>
    </div>  
    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.7/umd/popper.min.js" integrity="sha384-UO2eT0CpHqdSJQ6hJty5KVphtPhzWj9WO1clHTMGa3JDZwrnQq4sF86dIHNDz0W1" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js" integrity="sha384-JjSmVgyd0p3pXB1rRibZUAYoIIy6OrQ6VrjIEaFf/nJGzIxFDsf4x0xIM+B07jRM" crossorigin="anonymous"></script>
    <script src="js/app.js"></script>
</body>
</html>