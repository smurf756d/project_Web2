import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import StatsCards from "../components/dashboard/StatsCards";
import RecommendedRecipes from "../components/dashboard/RecommendedRecipes";

const UserDashboard = () => {
  return (
    <div className="bg-light min-vh-100">
      <div className="container-fluid">
        <div className="row g-0">
          <div className="col-12 col-md-3 col-lg-2">
            <Sidebar />
          </div>

          <div className="col-12 col-md-9 col-lg-10 p-3 p-md-4">
            <Topbar />

            <div className="card border-0 shadow-sm rounded-4 mb-4">
              <div className="card-body p-4">
                <div className="row align-items-center g-4">
                  <div className="col-12 col-lg-8">
                    <h2 className="fw-bold mb-2 text-success">
                      Welcome back, Rama 👋
                    </h2>
                    <p className="text-muted mb-0">
                      Here is your personalized cooking dashboard.
                    </p>
                  </div>

                  <div className="col-12 col-lg-4 text-lg-end">
                    <img
                      src="https://images.unsplash.com/photo-1547592180-85f173990554?w=600"
                      alt="food"
                      className="img-fluid rounded-4"
                      style={{ maxHeight: "180px", objectFit: "cover" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <StatsCards />
            <RecommendedRecipes />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;