import  {NextResponse, NextRequest} from 'next/server'
import  {pool}  from '../../../../config/db';

export async function GET(){//obtener empresas
    const [rows] = await pool.query('SELECT * FROM Empresa'); 
    //pool.destroy(); 
    return NextResponse.json(rows); 
}

export async function POST(req){//obtener empresas
    const {nombre, direccion} = await req.json(); 
    if(!nombre || !direccion){
        return  NextResponse.json({
            message: "Faltan datos"
        }); 
    }else{
        await pool.query('INSERT INTO Empresa SET ?',
            {
              nombre:nombre,
              direccion:direccion
            })
         return NextResponse.json({message: "Empresa Creada"});
    }
}

export async function PUT(req){//obtener empresas
    const {idEmpresa, nombre, direccion} = await req.json(); 
    if(!nombre || !direccion || !idEmpresa){
        return  NextResponse.json({
            message: "Faltan datos"
        }); 
    }else{
        await pool.query('UPDATE Empresa SET ? WHERE idEmpresa = ?', [{ nombre: nombre, direccion: direccion}, idEmpresa]);
         return NextResponse.json({message: "Empresa Actualizada"});
    }
}