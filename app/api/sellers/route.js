import { getSellers, createSellers } from "../../../controllers/sellerController";

export async function GET() {
    
    return getSellers();    
}

export async function POST(request) {

    return createSellers(request);
}