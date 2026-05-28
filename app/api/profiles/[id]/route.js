import { getSingleUser, updateUser, deleteUser } from "../../../../controllers/profileController";

export async function GET(request, context) {
    const {id} = await context.params;
    console.log(id);

    return getSingleUser(id)
};

export async function PUT(request, context) {
    const {id} = await context.params;

    return updateUser(request, id)
};

export async function DELETE(request, context) {
    const {id} = await context.params;

    return deleteUser(id)
};