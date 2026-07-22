import LoadingSpinner from "../../../components/pages/LoadingSpinner";
import useProfile from "../../../hooks/useProfile";
import AccountAvatar from "../components/AccountAvatar";
import AccountInformation from "../components/AccountInformation";
import AccountPassword from "../components/AccountPassword";
import AccountTopBar from "../components/AccountTopBar";

export default function Account() {
  const { data: profileData, isLoading, isError } = useProfile();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (isError || !profileData) {
    return <div>Failed to load profile</div>;
  }

  const profile = profileData;

  return (
    <>
      <AccountTopBar />
      <main className="p-4 sm:p-8 lg:px-32 lg:py-16">
        <div className="flex gap-8  flex-col max-w-160 mx-auto">
          <AccountAvatar profile={profile} />
          <AccountInformation profile={profile} isLoading={isLoading} />
          <AccountPassword />
        </div>
      </main>
    </>
  );
}
