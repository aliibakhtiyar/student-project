import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { useAuth } from "../context/AuthContext";
import StatCard from "../components/StatCard";
import api from "../services/api";

const Dashboard = () => {
  const { user } = useAuth();

  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);

  const firstName =
    user?.name?.split(" ")[0] || "Student";

  // ================================
  // FETCH DASHBOARD DATA
  // ================================

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const [jobsResponse, internshipsResponse] =
        await Promise.all([
          api.get("/opportunities/jobs", {
            params: {
              query: "developer",
              location: "Delhi",
              page: 1,
            },
          }),

          api.get("/opportunities/internships", {
            params: {
              query: "developer internship",
              location: "Delhi",
              page: 1,
            },
          }),
        ]);

      // ================================
      // JOBS
      // ================================

      const jobs = (
        jobsResponse.data?.jobs || []
      ).map((job) => ({
        id: `job-${job.id}`,
        title: job.title || "Developer",
        company:
          job.company?.display_name ||
          "Company",
        location:
          job.location?.display_name ||
          "Location unavailable",
        type: "Job",
        url: job.redirect_url || "#",
      }));

      // ================================
      // INTERNSHIPS
      // ================================

      const internships = (
        internshipsResponse.data?.internships || []
      ).map((job) => ({
        id: `internship-${job.id}`,
        title:
          job.title || "Developer Internship",
        company:
          job.company?.display_name ||
          "Company",
        location:
          job.location?.display_name ||
          "Location unavailable",
        type: "Internship",
        url: job.redirect_url || "#",
      }));

      setOpportunities([
        ...internships,
        ...jobs,
      ]);

    } catch (error) {
      console.error(
        "Dashboard API Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to load dashboard data"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================================
  // USE EFFECT
  // ================================

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div className="min-h-screen bg-[#070B14] px-4 py-6 text-white md:px-8">

      <div className="mx-auto max-w-7xl">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="relative mb-7 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl md:p-9">

          {/* Background Glow */}

          <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-20 left-20 h-48 w-48 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative">

            {/* Label */}

            <div className="flex items-center gap-2">

              <span className="h-2 w-2 animate-pulse rounded-full bg-indigo-400" />

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-indigo-400">
                Student workspace
              </p>

            </div>

            {/* Heading */}

            <h1 className="mt-3 text-3xl font-bold tracking-tight text-white md:text-4xl">

              Welcome back,{" "}

              <span className="text-indigo-400">
                {firstName}
              </span>

              .

            </h1>

            {/* Description */}

            <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400 md:text-base">
              Discover opportunities, build your
              profile, and stay connected with your
              student community.
            </p>

          </div>

        </div>


        {/* =====================================================
            STATS
        ===================================================== */}

        <div className="grid gap-4 md:grid-cols-3">

          {/* ================= OPPORTUNITIES ================= */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-indigo-500/30 hover:bg-white/[0.045]">

            <StatCard
              title="Opportunities"
              value={
                loading
                  ? "..."
                  : opportunities.length
              }
              description="Jobs & internships"
              icon="◆"
            />

          </div>


          {/* ================= BENEFITS ================= */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-indigo-500/30 hover:bg-white/[0.045]">

            <StatCard
              title="Student benefits"
              value="594 "
              description="Available for you"
              icon="★"
            />

          </div>


          {/* ================= PROFILE ================= */}

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-1 backdrop-blur-xl transition duration-200 hover:-translate-y-0.5 hover:border-indigo-500/30 hover:bg-white/[0.045]">

            <StatCard
              title="Profile strength"
              value="60%"
              description="Complete your profile"
              icon="↗"
            />

          </div>

        </div>


        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="mt-6 grid gap-6 lg:grid-cols-3">


          {/* ===================================================
              PROFILE CARD
          =================================================== */}

          <div className="relative overflow-hidden rounded-3xl border border-indigo-400/10 bg-gradient-to-br from-indigo-950/60 via-[#0B1220] to-[#0A0F1C] p-7 lg:col-span-1">

            {/* Glow */}

            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative">

              {/* Icon */}

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-lg text-indigo-400">
                ◈
              </div>


              {/* Title */}

              <h2 className="mt-6 text-xl font-bold text-white">
                Complete your profile
              </h2>


              {/* Description */}

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Add your skills, interests and
                experience to unlock better
                recommendations.
              </p>


              {/* Progress */}

              <div className="mt-7">

                <div className="mb-2 flex items-center justify-between text-xs">

                  <span className="text-slate-500">
                    Profile completion
                  </span>

                  <span className="font-bold text-indigo-400">
                    60%
                  </span>

                </div>


                <div className="h-2 overflow-hidden rounded-full bg-white/10">

                  <div className="h-full w-[60%] rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/30" />

                </div>

              </div>


              {/* Button */}

              <Link
                to="/profile"
                className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition hover:bg-indigo-500"
              >
                Complete profile

                <span>
                  →
                </span>

              </Link>

            </div>

          </div>


          {/* ===================================================
              OPPORTUNITIES
          =================================================== */}

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 backdrop-blur-xl lg:col-span-2">


            {/* ================= HEADER ================= */}

            <div className="flex items-center justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <span className="h-2 w-2 rounded-full bg-indigo-500 shadow-lg shadow-indigo-500/50" />

                  <h2 className="font-bold text-white">
                    Recommended opportunities
                  </h2>

                </div>

                <p className="mt-2 text-xs text-slate-500">
                  Curated jobs and internships for you
                </p>

              </div>


              {/* View All */}

              <Link
                to="/opportunities"
                className="hidden rounded-lg border border-white/10 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:border-indigo-400/30 hover:bg-indigo-500/5 hover:text-indigo-400 sm:block"
              >
                View all →
              </Link>

            </div>


            {/* =================================================
                LOADING
            ================================================= */}

            {loading ? (

              <div className="flex h-64 items-center justify-center">

                <div className="text-center">

                  <div className="mx-auto h-7 w-7 animate-spin rounded-full border-2 border-white/10 border-t-indigo-500" />

                  <p className="mt-3 text-xs text-slate-500">
                    Finding opportunities...
                  </p>

                </div>

              </div>

            ) : opportunities.length === 0 ? (

              /* =================================================
                  EMPTY STATE
              ================================================= */

              <div className="flex h-64 items-center justify-center text-center">

                <div>

                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-slate-500">
                    ◇
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-300">
                    No opportunities found
                  </p>

                  <p className="mt-1 text-xs text-slate-600">
                    Try again later.
                  </p>

                </div>

              </div>

            ) : (

              /* =================================================
                  OPPORTUNITY LIST
              ================================================= */

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {opportunities
                  .slice(0, 4)
                  .map((opportunity) => (

                    <a
                      key={opportunity.id}
                      href={opportunity.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-indigo-500/30 hover:bg-indigo-500/[0.04]"
                    >

                      {/* Top */}

                      <div className="flex items-start justify-between gap-3">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-indigo-400/10 bg-indigo-500/10 text-sm text-indigo-400">
                          ◆
                        </div>


                        <span className="rounded-full border border-indigo-400/10 bg-indigo-500/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-indigo-400">
                          {opportunity.type}
                        </span>

                      </div>


                      {/* Title */}

                      <p className="mt-4 line-clamp-2 text-sm font-semibold leading-5 text-slate-200 transition group-hover:text-indigo-400">
                        {opportunity.title}
                      </p>


                      {/* Company */}

                      <p className="mt-2 truncate text-xs text-slate-500">
                        {opportunity.company}
                      </p>


                      {/* Location */}

                      <p className="mt-2 truncate text-[11px] text-slate-600">
                        📍 {opportunity.location}
                      </p>

                    </a>

                  ))}

              </div>

            )}

          </div>

        </div>


        {/* =====================================================
            MOBILE VIEW ALL
        ===================================================== */}

        <div className="mt-5 sm:hidden">

          <Link
            to="/opportunities"
            className="flex w-full items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-xs font-semibold text-slate-400 transition hover:border-indigo-500/30 hover:bg-indigo-500/5 hover:text-indigo-400"
          >
            View all opportunities →
          </Link>

        </div>


      </div>

    </div>
  );
};

export default Dashboard;