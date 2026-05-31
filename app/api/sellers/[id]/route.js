import { getSingleSeller, updateSeller, deleteSeller } from "../../../../controllers/sellerController";


export async function GET(request, context) {
    const { id } = await context.params;

    return getSingleSeller(id);
}

export async function PUT(request, context) {
    const { id } = await context.params;

    return updateSeller(request, id);
};


export async function DELETE(request, context) {
    const { id } = context.params;

    return deleteSeller(id);
}