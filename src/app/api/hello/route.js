import { NextResponse, NextRequest } from "next/server";
import {pool} from '../../../config/db';

export async function GET(){
    const [rows] = await  pool.query('select * from Usuario'); 
    return NextResponse.json(rows); 
 }