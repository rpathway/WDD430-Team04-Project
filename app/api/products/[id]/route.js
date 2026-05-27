import { getSingleProduct, updateProduct, deleteProduct } from "../../../../controllers/productController";



export async function GET(request, context) {
    const { id } = await context.params;

    console.log(id);

    return getSingleProduct(id);
};
  
export async function PUT(request, context) {
    const { id } = await context.params;

    return updateProduct(request, id);
};
  
export async function DELETE(request, context) {
    const { id } = await context.params;

    return deleteProduct(id);
};