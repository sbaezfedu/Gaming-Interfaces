let currentIndex = 65

//fila 1
//coche1
let currentIndexCoche2 = 9
//coche2
let currentIndexSubcoche = 42
//coche3
let currentIndexSubcoche2 = 86
//-------------------
//fila 3
//coche1
let currentIndexCoche = 7
//coche2
let indexSubCoche2   =62
//coche3
let indexSubCoche3   =95
//-----------------
//ultima fila
//moto
let currentIndexCoche3 = 116
//------------------------------
//Troncos del agua segunda fila
//Tronco 1
let TroncoSegunda6= 12
let TroncoSegunda7 = 1

//Tronco2
let TroncoSegunda= 67
let TroncoSegunda2 = 56
let TroncoSegunda3 = 45
//Tronco3
let TroncoSegunda4 = 100
let TroncoSegunda5 = 89
//-----------------------
//Troncos del agua primera fila
//Tronco 1
let currentIndexTronco = 91
let currentIndexTronco2 =102
let currentIndexTronco3 =113
//Tronco2
let IndexTronco = 14
let IndexTronco2 = 25
let IndexTronco3 = 58
//-----------------------
//tortugas
let currentIndexTortuga = 2
//-----------------------
//fila camion
//camion
//camion delante
let currentIndexCamion =107
//camion detras
let currentIndexCamion2 =118
//coche1
let indexCocheCamion = 63
//coche2
let indexCocheCamion2 = 19
//--------------------------------------
const ancho = 11

//marcador
let vidas=3
let highscore =0
let tiempo =0
let dir 

function moveFrog(e) {

tabla[currentIndex].classList.remove('rana')

switch(dir){   
    case 2:
        tabla[currentIndex].classList.remove('ranaAbajo')
        break
    case 3:
        tabla[currentIndex].classList.remove('ranaIzq')
        break
    case 4:
        tabla[currentIndex].classList.remove('ranaDer')
        break
}

    switch(e.key) {
        case 'ArrowUp' :
             if (currentIndex % ancho !== 0){ currentIndex -= 1
                dir=1
             }
            break
        case 'ArrowDown' :
            if (currentIndex % ancho < ancho - 1) currentIndex += 1
             dir=2
            break
        case 'ArrowLeft' :
            if (currentIndex - ancho >=0 ) currentIndex -= ancho
                dir =3
            break
        case 'ArrowRight' :
            if (currentIndex + ancho < ancho * ancho) currentIndex += ancho
             dir=4
            //document.getElementsByClassName('rana').style.backgroundImage = "url('img/ranaDer.jpg')"
            break
    }
   
    if(tabla[currentIndex].classList.contains('agua') && !((tabla[currentIndex].classList.contains('tronco'))) && tabla[currentIndex].classList.contains('agua') && !((tabla[currentIndex].classList.contains('nenufar')))){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        
        currentIndex= 65
        tabla[currentIndex].classList.add('rana')
        vidas--;
        comprobarVida()
    }
 
    
    //saltar encima de un coche quita vida
    if(tabla[currentIndex].classList.contains('coche')|| tabla[currentIndex].classList.contains('coche2')||tabla[currentIndex].classList.contains('camion2')||tabla[currentIndex].classList.contains('cocheAzul')||tabla[currentIndex].classList.contains('camion1')){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        
        currentIndex= 65
        tabla[currentIndex].classList.add('rana')
        vidas--;
        comprobarVida()
    }
  
    tabla[currentIndex].classList.add('rana')

    switch(dir){
        
        case 2:
            tabla[currentIndex].classList.add('ranaAbajo')
            break
        case 3:
            tabla[currentIndex].classList.add('ranaIzq')
            break
        case 4:
            tabla[currentIndex].classList.add('ranaDer')
            break
    }
    
    
}
function comprobarVida(){
  
    if(vidas==2){
        document.getElementById("tres").style.display="none"

        document.getElementById("dos").style.display="block"
        document.getElementById("uno").style.display="block"
    }
    else if(vidas==1){
        document.getElementById("tres").style.display="none"
        document.getElementById("dos").style.display="none"

        document.getElementById("uno").style.display="block"
    }
    else if(vidas==0){
        document.getElementById("tres").style.display="none"
        document.getElementById("dos").style.display="none"
        document.getElementById("uno").style.display="none"
       
        document.getElementById('juego').style.display="none"
        document.getElementById('gameOver').style.display = "block"

    }
    else{
        document.getElementById("tres").style.display="block"
        document.getElementById("dos").style.display="block"
        document.getElementById("uno").style.display="block"
    }
}

function movimientoCoches(){
//fila 3 coches 1
   if(currentIndexCoche!=117){
    tabla[currentIndexCoche].classList.remove('coche')
    currentIndexCoche+=ancho
    tabla[currentIndexCoche].classList.add('coche')
   }
   else{
    tabla[currentIndexCoche].classList.remove('coche')
    currentIndexCoche=7
    tabla[currentIndexCoche].classList.add('coche')
   }
    //fila 3 coches 2
    if(indexSubCoche2!=117){
        tabla[indexSubCoche2].classList.remove('cocheAzul')
        indexSubCoche2+=ancho
        tabla[indexSubCoche2].classList.add('cocheAzul')
       }
       else{
        tabla[indexSubCoche2].classList.remove('cocheAzul')
        indexSubCoche2=7
        tabla[indexSubCoche2].classList.add('cocheAzul')
       }
         //fila 3 coches 3
    if(indexSubCoche3!=117){
        tabla[indexSubCoche3].classList.remove('cocheAzul')
        indexSubCoche3+=ancho
        tabla[indexSubCoche3].classList.add('cocheAzul')
       }
       else{
        tabla[indexSubCoche3].classList.remove('cocheAzul')
        indexSubCoche3=7
        tabla[indexSubCoche3].classList.add('cocheAzul')
       }

  

   //que un coche se choque quita vida
   if(tabla[indexSubCoche2].classList.contains('rana')){
       tabla[currentIndex].classList.remove('rana')
       switch(dir){   
        case 2:
            tabla[currentIndex].classList.remove('ranaAbajo')
            break
        case 3:
            tabla[currentIndex].classList.remove('ranaIzq')
            break
        case 4:
            tabla[currentIndex].classList.remove('ranaDer')
            break
    }
       currentIndex= 65
       tabla[currentIndex].classList.add('rana')
    vidas--;
    comprobarVida()
}
  

   //que un coche se choque quita vida
   if(tabla[indexSubCoche3].classList.contains('rana')){
    tabla[currentIndex].classList.remove('rana')
    switch(dir){   
     case 2:
         tabla[currentIndex].classList.remove('ranaAbajo')
         break
     case 3:
         tabla[currentIndex].classList.remove('ranaIzq')
         break
     case 4:
         tabla[currentIndex].classList.remove('ranaDer')
         break
 }
    currentIndex= 65
    tabla[currentIndex].classList.add('rana')
 vidas--;
 comprobarVida()
}
   //que un coche se choque quita vida
   if(tabla[currentIndexCoche].classList.contains('rana')){
       tabla[currentIndex].classList.remove('rana')
       switch(dir){   
        case 2:
            tabla[currentIndex].classList.remove('ranaAbajo')
            break
        case 3:
            tabla[currentIndex].classList.remove('ranaIzq')
            break
        case 4:
            tabla[currentIndex].classList.remove('ranaDer')
            break
    }
       currentIndex= 65
       tabla[currentIndex].classList.add('rana')
    vidas--;
    comprobarVida()
}


}
function movimientoCoche2(){
    //fila 1 coche 1
if(currentIndexCoche2!=119){
    tabla[currentIndexCoche2].classList.remove('coche')
    currentIndexCoche2+=ancho
    tabla[currentIndexCoche2].classList.add('coche')
   }
   else{
    tabla[currentIndexCoche2].classList.remove('coche')
    currentIndexCoche2=9
    tabla[currentIndexCoche2].classList.add('coche')
   }
      //fila 1 coche 2
if(currentIndexSubcoche!=119){
    tabla[currentIndexSubcoche].classList.remove('coche')
    currentIndexSubcoche+=ancho
    tabla[currentIndexSubcoche].classList.add('coche')
   }
   else{
    tabla[currentIndexSubcoche].classList.remove('coche')
    currentIndexSubcoche=9
    tabla[currentIndexSubcoche].classList.add('coche')
   }

        //fila 1 coche 3
if(currentIndexSubcoche2!=119){
    tabla[currentIndexSubcoche2].classList.remove('coche')
    currentIndexSubcoche2+=ancho
    tabla[currentIndexSubcoche2].classList.add('coche')
   }
   else{
    tabla[currentIndexSubcoche2].classList.remove('coche')
    currentIndexSubcoche2=9
    tabla[currentIndexSubcoche2].classList.add('coche')
   }

   //que un coche se choque quita vida(colision coche3)
   if(tabla[currentIndexSubcoche2].classList.contains('rana')){
       tabla[currentIndex].classList.remove('rana')
       switch(dir){   
        case 2:
            tabla[currentIndex].classList.remove('ranaAbajo')
            break
        case 3:
            tabla[currentIndex].classList.remove('ranaIzq')
            break
        case 4:
            tabla[currentIndex].classList.remove('ranaDer')
            break
    }
       currentIndex= 65
       tabla[currentIndex].classList.add('rana')
    vidas--;
    comprobarVida()
}

   //que un coche se choque quita vida(colision coche2)
   if(tabla[currentIndexSubcoche].classList.contains('rana')){
       tabla[currentIndex].classList.remove('rana')
       switch(dir){   
        case 2:
            tabla[currentIndex].classList.remove('ranaAbajo')
            break
        case 3:
            tabla[currentIndex].classList.remove('ranaIzq')
            break
        case 4:
            tabla[currentIndex].classList.remove('ranaDer')
            break
    }
       currentIndex= 65
       tabla[currentIndex].classList.add('rana')
    vidas--;
    comprobarVida()
}
    //que un coche se choque quita vida(colision coche1)
   if(tabla[currentIndexCoche2].classList.contains('rana')){
    tabla[currentIndex].classList.remove('rana')
    switch(dir){   
        case 2:
            tabla[currentIndex].classList.remove('ranaAbajo')
            break
        case 3:
            tabla[currentIndex].classList.remove('ranaIzq')
            break
        case 4:
            tabla[currentIndex].classList.remove('ranaDer')
            break
    }
    currentIndex= 65
    tabla[currentIndex].classList.add('rana')

    vidas--;
    comprobarVida()
}
}
function movimientoCoche3(){
    //coche rapido ultima fila
if(currentIndexCoche3!=6){
    tabla[currentIndexCoche3].classList.remove('coche2')
    currentIndexCoche3-=ancho
    tabla[currentIndexCoche3].classList.add('coche2')
   }
   else{
    tabla[currentIndexCoche3].classList.remove('coche2')
    currentIndexCoche3=116
    tabla[currentIndexCoche3].classList.add('coche2')
   }

    //que un coche se choque quita vida
   if(tabla[currentIndexCoche3].classList.contains('rana')){
    tabla[currentIndex].classList.remove('rana')
    switch(dir){   
        case 2:
            tabla[currentIndex].classList.remove('ranaAbajo')
            break
        case 3:
            tabla[currentIndex].classList.remove('ranaIzq')
            break
        case 4:
            tabla[currentIndex].classList.remove('ranaDer')
            break
    }
    currentIndex= 65
    tabla[currentIndex].classList.add('rana')

    vidas--;
    comprobarVida()
}
}

function movimientoCamion(){
    //fila camion camion
    if(currentIndexCamion!=8){
    tabla[currentIndexCamion].classList.remove('camion2')
    currentIndexCamion-=ancho
    tabla[currentIndexCamion].classList.add('camion2')

    }
    else{
        tabla[currentIndexCamion].classList.remove('camion2')
     
        currentIndexCamion=118
        tabla[currentIndexCamion].classList.add('camion2')
       }

       if(currentIndexCamion2!=8){
        tabla[currentIndexCamion2].classList.remove('camion1')
        currentIndexCamion2-=ancho
        tabla[currentIndexCamion2].classList.add('camion1')
        }
        else{

            tabla[currentIndexCamion2].classList.remove('camion1')
         
            currentIndexCamion2=118
            tabla[currentIndexCamion2].classList.add('camion1')
           }

           //fila camion coche 1
           if(indexCocheCamion!=8){
            tabla[indexCocheCamion].classList.remove('coche2')
            indexCocheCamion-=ancho
            tabla[indexCocheCamion].classList.add('coche2')
        
            }
            else{
                tabla[indexCocheCamion].classList.remove('coche2')
             
                indexCocheCamion=118
                tabla[indexCocheCamion].classList.add('coche2')
               }

                     //fila camion coche 2
           if(indexCocheCamion2!=8){
            tabla[indexCocheCamion2].classList.remove('coche2')
            indexCocheCamion2-=ancho
            tabla[indexCocheCamion2].classList.add('coche2')
        
            }
            else{
                tabla[indexCocheCamion2].classList.remove('coche2')
             
                indexCocheCamion2=118
                tabla[indexCocheCamion2].classList.add('coche2')
               }
               
   //que un coche se choque quita vida
   if(tabla[indexCocheCamion2].classList.contains('rana')){
    tabla[currentIndex].classList.remove('rana')
    switch(dir){   
        case 2:
            tabla[currentIndex].classList.remove('ranaAbajo')
            break
        case 3:
            tabla[currentIndex].classList.remove('ranaIzq')
            break
        case 4:
            tabla[currentIndex].classList.remove('ranaDer')
            break
    }
    currentIndex= 65
    tabla[currentIndex].classList.add('rana')
    vidas--;
    comprobarVida()
}

   //que un coche se choque quita vida
   if(tabla[indexCocheCamion].classList.contains('rana')){
    tabla[currentIndex].classList.remove('rana')
    switch(dir){   
        case 2:
            tabla[currentIndex].classList.remove('ranaAbajo')
            break
        case 3:
            tabla[currentIndex].classList.remove('ranaIzq')
            break
        case 4:
            tabla[currentIndex].classList.remove('ranaDer')
            break
    }
    currentIndex= 65
    tabla[currentIndex].classList.add('rana')
    vidas--;
    comprobarVida()
}
        //que un camion se choque quita vida
       if(tabla[currentIndexCamion].classList.contains('rana')){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        currentIndex= 65
        tabla[currentIndex].classList.add('rana')
        vidas--;
        comprobarVida()
    }
    if(tabla[currentIndexCamion2].classList.contains('rana')){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
       currentIndex= 65
       tabla[currentIndex].classList.add('rana')
        vidas--;
        comprobarVida()
    }
}
//movimiento de los troncos primera fila
function movimientoTronco(){

    //movimiento primer tronco
   if(currentIndexTronco!=3){
    
    tabla[currentIndexTronco].classList.remove('tronco')

    //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
    if(tabla[currentIndexTronco].classList.contains('rana')){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        currentIndex-=ancho
        tabla[currentIndex].classList.add('rana')
        switch(dir){
            case 2:
                tabla[currentIndex].classList.add('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.add('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.add('ranaDer')
                break
        }
    }

    currentIndexTronco-=ancho

    

    tabla[currentIndexTronco].classList.add('tronco')
   
   }
   else{
       
    tabla[currentIndexTronco].classList.remove('tronco')

    //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
    if( (tabla[currentIndexTronco].classList.contains('rana'))){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        
        currentIndex= 65
        tabla[currentIndex].classList.add('rana')
        vidas--;
        comprobarVida()
    }

    currentIndexTronco=113
    
    tabla[currentIndexTronco].classList.add('tronco')
   }

   //movimiento segundo tronco
   if(currentIndexTronco2!=3){

    tabla[currentIndexTronco2].classList.remove('tronco')

        //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
    if((tabla[currentIndexTronco2].classList.contains('rana'))){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        currentIndex-=ancho
        tabla[currentIndex].classList.add('rana')
        switch(dir){
            case 2:
                tabla[currentIndex].classList.add('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.add('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.add('ranaDer')
                break
        }
    }

    currentIndexTronco2-=ancho

   

    tabla[currentIndexTronco2].classList.add('tronco')
  
   }
   else{
       

    tabla[currentIndexTronco2].classList.remove('tronco')

        //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
    if( (tabla[currentIndexTronco2].classList.contains('rana'))){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        
        currentIndex= 65
        tabla[currentIndex].classList.add('rana')
        vidas--;
        comprobarVida()
    }
 
    currentIndexTronco2=113
    
    tabla[currentIndexTronco2].classList.add('tronco')
   }

   //moviemiento tercer tronco
   if(currentIndexTronco3!=3){

    tabla[currentIndexTronco3].classList.remove('tronco')

        //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
    if((tabla[currentIndexTronco3].classList.contains('rana'))){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        currentIndex-=ancho
        tabla[currentIndex].classList.add('rana')
        switch(dir){
            case 2:
                tabla[currentIndex].classList.add('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.add('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.add('ranaDer')
                break
        }
    }
    

    currentIndexTronco3-=ancho

   
    tabla[currentIndexTronco3].classList.add('tronco')
   
   }
   else{  
     tabla[currentIndexTronco3].classList.remove('tronco')

         //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
     if( (tabla[currentIndexTronco3].classList.contains('rana'))){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        
        currentIndex= 65
        tabla[currentIndex].classList.add('rana')
        vidas--;
        comprobarVida()
    }

    currentIndexTronco3=113

   
    tabla[currentIndexTronco3].classList.add('tronco')
   }

   //segundo tronco primera fila(primer trozo)
   if(IndexTronco!=3){
    tabla[IndexTronco].classList.remove('tronco')

    //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
    if(((tabla[IndexTronco].classList.contains('rana')))){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        currentIndex-=ancho
        tabla[currentIndex].classList.add('rana')
        switch(dir){
            case 2:
                tabla[currentIndex].classList.add('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.add('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.add('ranaDer')
                break
        }
    }


    IndexTronco-=ancho

    

    tabla[IndexTronco].classList.add('tronco')
   
   }
   else{
       
    tabla[IndexTronco].classList.remove('tronco')

    //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
    if( (tabla[IndexTronco].classList.contains('rana'))){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        
        currentIndex= 65
        tabla[currentIndex].classList.add('rana')
        vidas--;
        comprobarVida()
    }

    IndexTronco=113

   

    tabla[IndexTronco].classList.add('tronco')
   }
   //segundo tronco primera fila(segundp trozo)
   if(IndexTronco2!=3){
    tabla[IndexTronco2].classList.remove('tronco')

        //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
    if( (tabla[IndexTronco2].classList.contains('rana'))){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        currentIndex-=ancho
        tabla[currentIndex].classList.add('rana')
        switch(dir){
            case 2:
                tabla[currentIndex].classList.add('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.add('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.add('ranaDer')
                break
        }
    }

    IndexTronco2-=ancho

    

    tabla[IndexTronco2].classList.add('tronco')
   
   }
   else{
       
    tabla[IndexTronco2].classList.remove('tronco')

        //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
    if( (tabla[IndexTronco2].classList.contains('rana'))){
        tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        
        currentIndex= 65
        tabla[currentIndex].classList.add('rana')
        vidas--;
        comprobarVida()
    }

    IndexTronco2=113

    

    tabla[IndexTronco2].classList.add('tronco')
   }
      //tercer tronco primera fila
      if(IndexTronco3!=3){
        tabla[IndexTronco3].classList.remove('tronco')
    
            //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
        if( (tabla[IndexTronco3].classList.contains('rana'))){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            currentIndex-=ancho
            tabla[currentIndex].classList.add('rana')
            switch(dir){
                case 2:
                    tabla[currentIndex].classList.add('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.add('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.add('ranaDer')
                    break
            }
        }
    
        IndexTronco3-=ancho
        
       
        

        tabla[IndexTronco3].classList.add('tronco')

        
       }
       else{
           
        tabla[IndexTronco3].classList.remove('tronco')

            //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
        if( (tabla[IndexTronco3].classList.contains('rana'))){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            
            currentIndex= 65
            tabla[currentIndex].classList.add('rana')
            vidas--;
            comprobarVida()
        }
    
        IndexTronco3=113

        

        tabla[IndexTronco3].classList.add('tronco')
       }
      
}
//movimientos troncos ultima fila
function movimientoTronco2(){
    
  
    //------------------------------------------------------------------------------------------------------
    if(TroncoSegunda6!=111){
    
        tabla[TroncoSegunda6].classList.remove('tronco')
    
        //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
        if(tabla[TroncoSegunda6].classList.contains('rana')){
            tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        currentIndex+=ancho
        tabla[currentIndex].classList.add('rana')
        switch(dir){
            case 2:
                tabla[currentIndex].classList.add('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.add('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.add('ranaDer')
                break
        }
        }
    
        TroncoSegunda6+=ancho
    
        
    
        tabla[TroncoSegunda6].classList.add('tronco')
       
       }
       else{
           
        tabla[TroncoSegunda6].classList.remove('tronco')
    
        //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
        if( (tabla[TroncoSegunda6].classList.contains('rana'))){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            
            currentIndex= 65
            tabla[currentIndex].classList.add('rana')
            vidas--;
            comprobarVida()
        }
    
        TroncoSegunda6=1
        
        tabla[TroncoSegunda6].classList.add('tronco')
       }

       //------------------------------------------------------------------------------------------------------
       if(TroncoSegunda7!=111){
    
        tabla[TroncoSegunda7].classList.remove('tronco')
    
        //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
        if(tabla[TroncoSegunda7].classList.contains('rana')){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            currentIndex+=ancho
            tabla[currentIndex].classList.add('rana')
            switch(dir){
                case 2:
                    tabla[currentIndex].classList.add('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.add('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.add('ranaDer')
                    break
            }
        }
    
        TroncoSegunda7+=ancho
    
        
    
        tabla[TroncoSegunda7].classList.add('tronco')
       
       }
       else{
           
        tabla[TroncoSegunda7].classList.remove('tronco')
    
        //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
        if( (tabla[TroncoSegunda7].classList.contains('rana'))){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            
            currentIndex= 65
            tabla[currentIndex].classList.add('rana')
            vidas--;
            comprobarVida()
        }
    
        TroncoSegunda7=1
        
        tabla[TroncoSegunda7].classList.add('tronco')
       }
       //-------------------------------------------------------------------
    if(TroncoSegunda!=111){
    
        tabla[TroncoSegunda].classList.remove('tronco')
    
        //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
        if(tabla[TroncoSegunda].classList.contains('rana')){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            currentIndex+=ancho
            tabla[currentIndex].classList.add('rana')
            switch(dir){
                case 2:
                    tabla[currentIndex].classList.add('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.add('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.add('ranaDer')
                    break
            }
        }
    
        TroncoSegunda+=ancho
    
        
    
        tabla[TroncoSegunda].classList.add('tronco')
       
       }
       else{
           
        tabla[TroncoSegunda].classList.remove('tronco')
    
        //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
        if( (tabla[TroncoSegunda].classList.contains('rana'))){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            
            currentIndex= 65
            tabla[currentIndex].classList.add('rana')
            vidas--;
            comprobarVida()
        }
    
        TroncoSegunda=1
        
        tabla[TroncoSegunda].classList.add('tronco')
       }
//---------------------------------------------------------------------//
       if(TroncoSegunda2!=111){
    
        tabla[TroncoSegunda2].classList.remove('tronco')
    
        //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
        if(tabla[TroncoSegunda2].classList.contains('rana')){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            currentIndex+=ancho
            tabla[currentIndex].classList.add('rana')
            switch(dir){
                case 2:
                    tabla[currentIndex].classList.add('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.add('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.add('ranaDer')
                    break
            }
        }
    
        TroncoSegunda2+=ancho
    
        
    
        tabla[TroncoSegunda2].classList.add('tronco')
       
       }
       else{
           
        tabla[TroncoSegunda2].classList.remove('tronco')
    
        //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
        if( (tabla[TroncoSegunda2].classList.contains('rana'))){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            
            currentIndex= 65
            tabla[currentIndex].classList.add('rana')
            vidas--;
            comprobarVida()
        }
    
        TroncoSegunda2=1
        
        tabla[TroncoSegunda2].classList.add('tronco')
       }
       //---------------------------------------------------------------------//

       if(TroncoSegunda3!=111){
    
  
        tabla[TroncoSegunda3].classList.remove('tronco')
    
        //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
        if(tabla[TroncoSegunda3].classList.contains('rana')){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            currentIndex+=ancho
            tabla[currentIndex].classList.add('rana')
            switch(dir){
                case 2:
                    tabla[currentIndex].classList.add('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.add('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.add('ranaDer')
                    break
            }
        }
    
        TroncoSegunda3+=ancho
    
        
    
        tabla[TroncoSegunda3].classList.add('tronco')
       
       }
       else{
           
        tabla[TroncoSegunda3].classList.remove('tronco')
    
        //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
        if( (tabla[TroncoSegunda3].classList.contains('rana'))){
            tabla[currentIndex].classList.remove('rana')
        switch(dir){   
            case 2:
                tabla[currentIndex].classList.remove('ranaAbajo')
                break
            case 3:
                tabla[currentIndex].classList.remove('ranaIzq')
                break
            case 4:
                tabla[currentIndex].classList.remove('ranaDer')
                break
        }
        
        currentIndex= 65
        tabla[currentIndex].classList.add('rana')
        vidas--;
        comprobarVida()
        }
    
        TroncoSegunda3=1
        
        tabla[TroncoSegunda3].classList.add('tronco')
       }


       if(TroncoSegunda4!=111){
    
        tabla[TroncoSegunda4].classList.remove('tronco')
    
        //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
        if(tabla[TroncoSegunda4].classList.contains('rana')){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            currentIndex+=ancho
            tabla[currentIndex].classList.add('rana')
            switch(dir){
                case 2:
                    tabla[currentIndex].classList.add('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.add('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.add('ranaDer')
                    break
            }
        }
    
        TroncoSegunda4+=ancho
    
        
    
        tabla[TroncoSegunda4].classList.add('tronco')
       
       }
       else{
           
        tabla[TroncoSegunda4].classList.remove('tronco')
    
        //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
        if( (tabla[TroncoSegunda4].classList.contains('rana'))){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            
            currentIndex= 65
            tabla[currentIndex].classList.add('rana')
            vidas--;
            comprobarVida()
        }
    
        TroncoSegunda4=1
        
        tabla[TroncoSegunda4].classList.add('tronco')
       }
//------------------------------------------------------------------------------------------------------
       if(TroncoSegunda5!=111){
    
        tabla[TroncoSegunda5].classList.remove('tronco')
    
        //si en la posicion del tronco hay una clase rana la rana se mueve con el trronco
        if(tabla[TroncoSegunda5].classList.contains('rana')){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            currentIndex+=ancho
            tabla[currentIndex].classList.add('rana')
            switch(dir){
                case 2:
                    tabla[currentIndex].classList.add('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.add('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.add('ranaDer')
                    break
            }
        }
    
        TroncoSegunda5+=ancho
    
        
    
        tabla[TroncoSegunda5].classList.add('tronco')
       
       }
       else{
           
        tabla[TroncoSegunda5].classList.remove('tronco')
    
        //si la rana no ha saltado antes de que el tronco se haya quitado pierde una vida
        if( (tabla[TroncoSegunda5].classList.contains('rana'))){
            tabla[currentIndex].classList.remove('rana')
            switch(dir){   
                case 2:
                    tabla[currentIndex].classList.remove('ranaAbajo')
                    break
                case 3:
                    tabla[currentIndex].classList.remove('ranaIzq')
                    break
                case 4:
                    tabla[currentIndex].classList.remove('ranaDer')
                    break
            }
            
            currentIndex= 65
            tabla[currentIndex].classList.add('rana')
            vidas--;
            comprobarVida()
        }
    
        TroncoSegunda5=1
        
        tabla[TroncoSegunda5].classList.add('tronco')
       }
    
       
   
    
}

    //marcadores y tiempos
function tiempoJuego(){
    tiempo=tiempo+1
    document.getElementById('tiempo').innerHTML= tiempo
}
function calcularHighscore(){
    switch(vidas){
        case 0:
            highscore=0
            break
        case 1:
            highscore=1000
        break
        case 2: 
        highscore=10000
        break
        case 3: 
        highscore=100000
        break
    }
    highscore =highscore/tiempo  
   highscore= Math.round(highscore)
}
//<!>Arreglar<!>
function victoria(){

    


    let input =document.getElementById('nombreJugador')
    if(tabla[currentIndex].classList.contains('familia') && highscore==0){
      
        calcularHighscore();
        if(localStorage.getItem('jugadores') ==null ){
            var Jug =  new Jugador(input.value,highscore)
            arrayJugadores.push(Jug)
            localStorage.setItem("jugadores",JSON.stringify(arrayJugadores))
        }
        else{
            arrayJugadores = localStorage.getItem('jugadores')
            arrayJugadores=JSON.parse(arrayJugadores)
            console.log(arrayJugadores)

            var Jug =  new Jugador(input.value,highscore)
            arrayJugadores.push(Jug)
            localStorage.setItem("jugadores",JSON.stringify(arrayJugadores))
        }
        console.log("higscore"+localStorage.getItem(input.value)+"  nombre:"+input.value)

        clearInterval(intervaloCoche1)
        clearInterval(intervaloCoche2)
        clearInterval(intervaloCoche3)
        clearInterval(intervaloTronco)
        clearInterval(intervaloTronco2)
        clearInterval(intervaloTiempo)
        clearInterval(intervaloCamion)
                
        setTimeout('mostrarPuntuacion()',600)

       
        
        arrayJugadores.sort(function(a, b){return b.highscore  - a.highscore})

        console.log(arrayJugadores)
       
        if(arrayJugadores.length>=0){
            document.getElementById('primero').innerHTML = "1.- "+arrayJugadores[0].nombre +":"+arrayJugadores[0].highscore
        }
        if(arrayJugadores.length>1){
            document.getElementById('segundo').innerHTML = "2.- "+arrayJugadores[1].nombre +":"+arrayJugadores[1].highscore
        }
        if(arrayJugadores.length>2){
            document.getElementById('tercero').innerHTML = "3.- "+arrayJugadores[2].nombre +":"+arrayJugadores[2].highscore
        }
        if(arrayJugadores.length>3){
            document.getElementById('cuarto').innerHTML = "4.- "+arrayJugadores[3].nombre +":"+arrayJugadores[3].highscore
        }
        if(arrayJugadores.length>4){
            document.getElementById('quinto').innerHTML = "5.- "+arrayJugadores[4].nombre +":"+arrayJugadores[4].highscore
        }
       
        document.getElementById('marcaPersonal').innerHTML = "Tu Puntucion "+input.value +":"+highscore
    }


}

class Jugador{
    constructor(nombre,highscore){
        this.nombre =nombre
        this.highscore = highscore
    }
    get getNombre(){
        return this.nombre
    }
    get getHighscore(){
        return this.highscore
    }
}