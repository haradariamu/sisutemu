
let width = 16;
let height = 16;
let mem_length = width / 8 * height;
let mem = new Uint8Array( mem_length );
for( let i=0; i<mem_length; i++ )   mem[i] = i;

set_memory( 0, mem, mem_length );
init_display( width, height );
clearDisplay();
memory2display();
memory3display();

function padding8( number ) {
    if( number )
        return ('0' + number.toString(16)).slice(-2).toUpperCase();
    else if( number == 0 )  return '00';
    else return '----';
}

function padding16( number ) {
    if( number )
        return ('000' + number.toString(16)).slice(-4).toUpperCase();
    else if( number == 0 )  return '0000';
    else return '----';
}

function padding_bin8( number ) {
    if( number )
        return ('00000000' + number.toString(2)).slice(-8);
    else if( number == 0 )  return '00000000';
    else return '----';
}

/**
 * メモリの表示領域を作成する
 * @param {number} address 開始アドレス
 * @param {Uint8Array} mem メモリの内容
 * @param {number} length 表示錠確保する長さ
 */
function set_memory( address, mem, length ) {
    let memory = document.querySelector('#memory_view1');

    for( let i=0; i<length; i++ ) {
        
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        td1.classList.add('address');
        td1.innerText = padding16( address+i );
        
        let td2 = document.createElement('td');
        let memArea = document.createElement('input');
        memArea.classList.add('mem_value');
        memArea.setAttribute( 'type', 'text' );
        memArea.setAttribute( 'value',  padding8(mem[i]) );
        memArea.addEventListener('change', () => {
            clearDisplay();
            memory2display();
            let memoryB = document.querySelectorAll('.mem_value');
            let value = parseInt(memoryB[i].value, 16);
            let padBinary = String(value.toString(2)).padStart(8, '0');
            memAreaB.value = padBinary ;
            /*ここに2進数の変更の処理を書き込む */
        })
        
        let td3 = document.createElement('td');
        let memAreaB = document.createElement('input');
        memAreaB.classList.add('mem_binary');
        memAreaB.setAttribute( 'type', 'text' );
        memAreaB.setAttribute( 'value', padding_bin8(mem[i]) );
        memAreaB.addEventListener('change', () => {
            clearDisplay();
            memory3display();
            let memoryB = document.querySelectorAll('.mem_binary');
            let value2 = parseInt(memoryB[i].value, 2);
            let padBinary2 = String(value2.toString(16)).padStart(2, '0');
            //memArea.setAttribute( 'value', padBinary2 );
            memArea.value = padBinary2;
            /*ここに2進数の変更の処理を書き込む */
        })
        td3.appendChild(memAreaB);
        td2.appendChild(memArea);
        
        if(i % 2 ==0){
        tr.appendChild(td1);
        }
        tr.appendChild(td2);
        tr.appendChild(td3);
        memory.appendChild(tr);
        memArea.addEventListener('change', () => {
            clearDisplay();
            memory2display();
            //memory3display();
        })/*ここで表の表示の設定をしているアドレスは0,4,8だけ二進数はそれ単体の表を作り
        １６真数は横に並べる */
    }
}


function init_display( width, height ) {
    let display = document.querySelector( '#display' );
    for( let y=0; y<height; y++ ) {
        let div = document.createElement( 'div' );
        div.classList.add("line");
        display.appendChild(div);/*appendChildはその前のものを繰り返す */
        for( let x=0; x<width; x++ ) {
            let pixel = document.createElement( 'div' );
            pixel.classList.add("dot");
            pixel.setAttribute('id', 'dot_'+y+'_'+x);
            div.appendChild( pixel );
        }
    }
}

function clearDisplay() {
    for( let y=0; y<height; y++ ) {
        for( let x=0; x<width; x++ ) {
            let dot = document.querySelector( '#dot_'+y+'_'+x );
            dot.classList.remove( 'black', 'white' );
        }
    }
}
function memory2display() {
    let addr = 0;
    let memory = document.querySelectorAll('.mem_value');
    for( let y=0; y<height; y++ ) {
        for( let x=0; x<width/8; x++ ) {
            let value = parseInt(memory[addr].value, 16);
            
            
            let bit_value=128;
            /*ここだと思う*/ 
            for( let bit=0; bit<8; bit++ ) {
                let dot = document.querySelector('#dot_'+y+'_'+(x*8+bit));
                //console.log({addr, value, bit, x, y});
                let attr = ((value&bit_value)?'white':'black');
                dot.classList.add( attr );
                bit_value/=2;
            }
            addr++;
        }
    }
}
function memory3display() {
    let addr = 0;
    let memory = document.querySelectorAll('.mem_binary');
    for( let y=0; y<height; y++ ) {
        for( let x=0; x<width/8; x++ ) {
            let value = parseInt(memory[addr].value, 2);
            let bit_value=128;
            /*ここだと思う*/ 
            for( let bit=0; bit<8; bit++ ) {
                let dot = document.querySelector('#dot_'+y+'_'+(x*8+bit));
                //console.log({addr, value, bit, x, y});
                let attr = ((value&bit_value)?'white':'black');
                dot.classList.add( attr );
                bit_value/=2;
            }
            addr++;
        }
    }
}

/*let binary = parseInt(memoryB[i].binary, 2);
            console.log(memoryB[i]);
            // =memoryB;*/ 



function display2memory() {

}
