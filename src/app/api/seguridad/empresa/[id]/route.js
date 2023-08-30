
import { NextRequest, NextResponse } from "next/server";
import  {pool}  from '../../../../../config/db'; 

export async function GET(request, { params }){//obtener empresas por id
   return NextResponse.json({datos: params.id})
}

export async function DELETE(request, { params }){//obtener empresas por id
   try {
    console.log(params.id);
      const result = await pool.query("DELETE FROM Empresa WHERE idEmpresa = ?", [
        params.id,
      ]);
  
      if (result.affectedRows === 0) {
        return NextResponse.json(
          {
            message: "Empresa no encontrada",
          },
          {
            status: 404,
          }
        );
      }
      return new Response(null, {
        status: 204,
      });
    } catch (error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        { status: 500 }
      );
    }
}