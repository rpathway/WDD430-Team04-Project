import {
    getCurrentSeller,
    updateCurrentSeller,
  } from "@/controllers/sellerController";
  
  export async function GET() {
    return getCurrentSeller();
  }
  
  export async function PUT(request) {
    return updateCurrentSeller(request);
  }