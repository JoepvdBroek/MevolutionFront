@extends('template.admin')

@section('style-debug')

    <link rel="stylesheet" href="dev/css/edituser.css" type="text/css" />

@endsection

@section('style-non-debug')

    <link rel="stylesheet" href="assets/css/edituser.min.css" type="text/css" />

@endsection

@section('content')

<div class="row">
    <div class="col-md-1"></div>
    <div class="title-header col-md-10">
        <h1>Profielgegevens</h1>
        <div class="divider"></div>
    </div>
    <div class="col-md-1"></div>
</div>
<div class="row "> 
    <div class="col-md-1"></div>
    <div class="col-md-10">
        <form>
        <div class="row"></div>
            <div class="col-md-3">
                <div class="form-group">
                    <label for="exampleInputFile">Pasfoto</label><br />
                    <img src="assets/img/placeholder-photo.png" alt="Pasfoto" />
                    <br /><br />
                    <div id="uploadbutton">
                        <div class="btn btn-default" onclick="document.getElementById('photo-file').click();">
                            Kies foto
                        </div>
                        <input type="file" id="photo-file">
                        <p class="help-block">Kies een pasfoto met de afmetingen 150x240 pixels.</p>
                    </div>
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label for="name">Voornaam</label>
                    <input type="text" class="form-control" id="name" value="Joep">
                </div>
                <div class="form-group">
                    <label for="lastname">Achternaam</label>
                    <input type="text" class="form-control" id="lastname" value="van den Broek">
                </div>
                <div class="form-group">
                    <label for="streetname">Straat</label>
                    <input type="text" class="form-control" id="streetname" value="leijzoom">
                </div>
                <div class="form-group">
                    <label for="streetnumber">Huisnummer</label>
                    <input type="text" class="form-control" id="streetnumber" value="4">
                </div>
                <div class="form-group">
                    <label for="zipcode">Postcode</label>
                    <input type="text" class="form-control" id="zipcode" value="5051WZ">
                </div>

                <button type="submit" id="editprofile-button" class="btn btn-default">Opslaan</button>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label for="city">Woonplaats</label>
                    <input type="text" class="form-control" id="city" value="Goirle">
                </div>
                <div class="form-group">
                    <label for="email">E-mail adres</label>
                    <input type="text" class="form-control" id="email" value="jjc.vandenbroek@student.avans.nl">
                </div>
                <div class="form-group">
                    <label for="phonenumber1">Telefoon nummer 1</label>
                    <input type="text" class="form-control" id="phonenumber1" value="0636499520">
                </div>
                <div class="form-group">
                    <label for="phonenumber2">Telefoon nummer 2</label>
                    <input type="text" class="form-control" id="phonenumber2" >
                </div>
                
            </div>
        </form>
    </div>
    <div class="col-md-1"></div>
</div>

@endsection

