
import EmptyState from "@/app/components/EmptyState";
import ClientOnly from "@/app/components/ClientOnly";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getListings from "@/app/actions/getListings";

import PropertiesClient from "./PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
                  <div className="pt-[7.5rem]">
    <EmptyState
      title="Unauthorized"
      subtitle="Please login"
    />
    </div>
    )
  }

  const listings = await getListings({ userId: currentUser.id });

  if (listings.length === 0) {
    return (
      <ClientOnly>
       <div className="pt-[7.5rem]"> 
        <EmptyState
          title="No properties found"
          subtitle="Looks like you have no properties."
        />
        </div>
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
       <div className="pt-[7.5rem]"> 
      <PropertiesClient
        listings={listings}
        currentUser={currentUser}
      />
      </div>
    </ClientOnly>
  );
}
 
export default PropertiesPage;
