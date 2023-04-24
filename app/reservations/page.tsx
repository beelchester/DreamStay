
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";

import TripsClient from "./ReservationClient";

const ReservationsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <ClientOnly> 
        <div className="pt-[7.5rem]">
        <EmptyState
          title="Unauthorized"
          subtitle="Please login"
        />
        </div>
      </ClientOnly>
    )
  }

  const reservations = await getReservations({ authorId: currentUser.id });

  if (reservations.length === 0) {
    return (
      <ClientOnly>
        <div className="pt-[7.5rem]">
        <EmptyState
          title="No reservations found"
          subtitle="Looks like you have no reservations on your properties."
        />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
        <div className="pt-[7.5rem]">
      <TripsClient
        reservations={reservations}
        currentUser={currentUser}
      />
        </div>
    </ClientOnly>
  );
}
 
export default ReservationsPage;
