import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getCurrentUser from "../actions/getCurrentUser";
import getReservations from "../actions/getReservations";
import TripsClient from "./TripsClient";

const TripsPage = async () => {
    const currentUser = await getCurrentUser()

    if(!currentUser) {
        <ClientOnly>
        <div className="pt-[7.5rem]">
            <EmptyState
                title="You are not logged in"
                subtitle="Please login"
            />
</div>
        </ClientOnly>
    }

    const reservations = await getReservations({
            userId: currentUser?.id
        }
    )

    if(reservations.length === 0) {
        <ClientOnly>
                    <div className="pt-[7.5rem]">
            <EmptyState
                title="No trips found"
                subtitle="Looks like you haven't reserved any trips yet"
            />
</div>
        </ClientOnly>
    }
    return (
                    <div className="pt-[7.5rem]">
        <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
        />
        </div>
    )
    }

export default TripsPage
