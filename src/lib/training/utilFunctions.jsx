import { motion } from "framer-motion";
import { GraduationCap, Home, BookOpen, ChevronRight, Target, CheckCircle, Clock, Award, Search, Eye, EyeOff, Plus, ChevronDown, ChevronRight, Pencil, Trash2, Download } from "lucide-react";
import Link from "next/link";
export function TrainingTopBar(
    completedChapters,
    totalChapters,
    completionPercentage,
    markAllAsCompleted,
    resetProgress
) {

  return (
    <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-8xl mx-auto mb-4 sm:mb-6"
      >
        <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg shadow-blue-100/30 p-4 sm:p-6">
          {/* Top Row */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            {/* Left Section */}
            <div className="flex items-center gap-3">
              <motion.div whileHover={{ scale: 1.05 }} className="relative">
                <div className="absolute inset-0 bg-linear-to-br from-purple-400 to-pink-400 rounded-xl blur opacity-20"></div>
                <div className="relative bg-linear-to-br from-purple-500 to-pink-500 p-3 rounded-xl">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
              </motion.div>

              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                    Training Portal
                  </h1>
                  <div className="px-2 py-1 bg-linear-to-r from-purple-100 to-pink-100 rounded-lg">
                    <span className="text-xs font-semibold bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      TRAINING
                    </span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  Interactive learning materials and resources
                </p>
              </div>
            </div>

            {/* Breadcrumb Navigation - Hidden on mobile */}
            <div className="hidden sm:flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-xl border border-slate-200">
              <Link
                href="/aca/dashboard"
                className="flex items-center gap-2 text-slate-700 hover:text-purple-600 transition-colors duration-100 group"
              >
                <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-100" />
                <span className="text-sm font-medium group-hover:text-purple-600 transition-colors duration-100">
                  Home
                </span>
              </Link>

              <ChevronRight className="w-4 h-4 text-slate-400 mx-1" />

              <div className="flex items-center gap-2 text-purple-600">
                <BookOpen className="w-4 h-4" />
                <span className="text-sm font-semibold">Training</span>
              </div>
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="mt-6 sm:mt-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                <h3 className="font-semibold text-slate-900">
                  Learning Progress
                </h3>
              </div>
              <div className="text-sm text-slate-600">
                <span className="font-bold text-purple-600">
                  {completedChapters}
                </span>{" "}
                of{" "}
                <span className="font-bold text-slate-900">
                  {totalChapters}
                </span>{" "}
                chapters
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative">
              <div className="h-3 sm:h-4 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${completionPercentage}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full rounded-full bg-linear-to-r from-purple-500 via-pink-500 to-orange-500 shadow-lg"
                />
              </div>

              {/* Progress Indicators */}
              <div className="absolute top-0 left-0 w-full h-3 sm:h-4 flex items-center justify-between px-2">
                {[0, 25, 50, 75, 100].map((percent) => (
                  <div
                    key={percent}
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${
                      completionPercentage >= percent
                        ? "bg-white shadow-lg"
                        : "bg-slate-300"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Progress Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mt-2">
              <div className="text-xs text-slate-500">
                {completionPercentage}% • {totalChapters - completedChapters}{" "}
                remaining
              </div>
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={markAllAsCompleted}
                  className="text-xs px-3 py-1 bg-linear-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-lg hover:shadow transition-all duration-100"
                >
                  Mark All
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetProgress}
                  className="text-xs px-3 py-1 bg-linear-to-r from-slate-50 to-gray-50 text-slate-700 rounded-lg hover:shadow transition-all duration-100"
                >
                  Reset
                </motion.button>
              </div>
            </div>
          </div>

          {/* Training Stats Row - Responsive Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 mt-4 sm:mt-6">
            <div className="bg-linear-to-br from-blue-50 to-cyan-50 p-3 sm:p-4 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">Total</div>
                <BookOpen className="w-4 h-4 text-blue-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">
                {data.length}
              </div>
            </div>
            <div className="bg-linear-to-br from-purple-50 to-pink-50 p-3 sm:p-4 rounded-xl border border-purple-100">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">Completed</div>
                <CheckCircle className="w-4 h-4 text-purple-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">
                {completedChapters}
              </div>
            </div>
            <div className="bg-linear-to-br from-emerald-50 to-teal-50 p-3 sm:p-4 rounded-xl border border-emerald-100">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">Time Spent</div>
                <Clock className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">
                {userProgress.totalTimeSpent}m
              </div>
            </div>
            <div className="bg-linear-to-br from-amber-50 to-orange-50 p-3 sm:p-4 rounded-xl border border-amber-100">
              <div className="flex items-center justify-between">
                <div className="text-xs text-slate-500">Streak</div>
                <Award className="w-4 h-4 text-amber-500" />
              </div>
              <div className="text-xl sm:text-2xl font-bold text-slate-900 mt-1 sm:mt-2">
                {userProgress.streakDays} days
              </div>
            </div>
          </div>
        </div>
      </motion.div>
  );
}


export function MainContentCard(){
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="max-w-7xl mx-auto"
      >
        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl sm:shadow-2xl shadow-blue-100/50 p-4 sm:p-6 md:p-8">
          {/* Header with Controls */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6 sm:mb-8 gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-linear-to-br from-purple-500 to-pink-500 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl">
                <BookOpen className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                  Training Materials
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                  {filteredData.length} chapters • {completedChapters} completed
                </p>
              </div>
            </div>

            {/* Search and Actions */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2  h-3 w-3 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search chapters..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-1.5 border border-slate-300 rounded-xl placeholder:text-[14px] focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none transition-all duration-100 w-full"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setShowCompleted(!showCompleted)}
                  className={`px-3 sm:px-4 py-2.5 rounded-xl font-medium transition-all duration-100 flex items-center gap-2 flex-1 sm:flex-none justify-center ${
                    showCompleted
                      ? "bg-linear-to-r from-purple-50 to-pink-50 text-purple-700 border border-purple-200"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  {showCompleted ? (
                    <Eye className="w-4 h-4" />
                  ) : (
                    <EyeOff className="w-4 h-4" />
                  )}
                  <span className="hidden sm:inline">Completed</span>
                </button>

                {isAdmin && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={openAddModal}
                    className="px-4 sm:px-6 py-2.5 rounded-xl font-medium bg-linear-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-200 transition-all duration-100 flex items-center gap-2 flex-1 sm:flex-none justify-center"
                  >
                    <Plus size={18} />
                    <span className="hidden sm:inline">Add Chapter</span>
                    <span className="sm:hidden">Add</span>
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Completion Banner */}
          {allChaptersCompleted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-4 sm:mb-6 p-3 sm:p-4 bg-linear-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl sm:rounded-2xl"
            >
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="bg-linear-to-br from-emerald-500 to-teal-500 p-2 sm:p-3 rounded-xl">
                    <Award className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-emerald-900 text-sm sm:text-base">
                      🎉 Training Completed!
                    </h3>
                    <p className="text-xs sm:text-sm text-emerald-700">
                      All {totalChapters} chapters completed
                    </p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleCompleteAll}
                  className="px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-emerald-200 transition-all duration-100 flex items-center gap-2 w-full sm:w-auto justify-center"
                >
                  <Download className="w-4 sm:w-5 h-4 sm:h-5" />
                  <span className="text-sm">Get Certificate</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Training Materials List */}
          <div className="space-y-3">
            {filteredData.length > 0 ? (
              filteredData.map((item, index) => {
                const isOpen = openId === item.id;

                return (
                  <motion.div
                    key={String(item.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    whileHover={{
                      scale: 1.01,
                      y: -2,
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
                    }}
                    className={`group relative bg-white border rounded-xl sm:rounded-2xl transition-all duration-150 hover:border-purple-200
                      ${
                        isOpen
                          ? "border-purple-300 bg-linear-to-r from-purple-50/30 via-white to-white"
                          : "border border-slate-200"
                      }
                      ${
                        item.completed ? "border-l-4 border-l-emerald-500" : ""
                      }`}
                  >
                    {/* Header */}
                    <div
                      className={`flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 sm:px-6
                      ${
                        isOpen
                          ? "bg-linear-to-r from-purple-50/50 to-transparent"
                          : "bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {/* Completion Checkbox */}
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => toggleCompletion(item.id)}
                          className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-100 ${
                            item.completed
                              ? "bg-linear-to-br from-emerald-500 to-teal-500"
                              : "bg-slate-100 hover:bg-slate-200"
                          }`}
                          title={
                            !isAdmin ? "Toggle completion" : "Login required"
                          }
                        >
                          {item.completed && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ type: "spring" }}
                            >
                              <CheckCircle className="w-5 h-5 text-white" />
                            </motion.div>
                          )}
                        </motion.button>

                        <button
                          onClick={() => toggle(item.id)}
                          className="flex items-center gap-3 text-left flex-1 group/button"
                        >
                          {isOpen ? (
                            <motion.div
                              animate={{ rotate: 180 }}
                              transition={{ duration: 0.2 }}
                            >
                              <ChevronDown
                                className="text-purple-500 group-hover/button:text-purple-600 transition-colors duration-100"
                                size={20}
                              />
                            </motion.div>
                          ) : (
                            <ChevronRight
                              className="text-purple-500 group-hover/button:text-purple-600 transition-colors duration-100"
                              size={20}
                            />
                          )}

                          <div className="flex items-center gap-3 sm:gap-4 flex-1">
                            <div
                              className={`hidden xs:flex w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-xl font-bold shadow-sm ${
                                item.completed
                                  ? "bg-linear-to-br from-emerald-100 to-teal-100 text-emerald-700"
                                  : "bg-linear-to-br from-purple-100 to-pink-100 text-purple-700"
                              }`}
                            >
                              {index + 1}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-slate-800 font-semibold text-base sm:text-[16px] text-[14px] truncate">
                                  {item.title}
                                </span>
                                {item.completed && (
                                  <span className="hidden sm:inline px-2 py-0.5 bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-medium rounded-lg">
                                    COMPLETED
                                  </span>
                                )}
                              </div>
                              <div className="flex items-center gap-2 mt-1">
                                <div
                                  className={`px-2 py-0.5 rounded-lg text-xs font-medium ${
                                    item.type === "video"
                                      ? "bg-red-50 text-red-700"
                                      : item.type === "pdf"
                                      ? "bg-blue-50 text-blue-700"
                                      : "bg-emerald-50 text-emerald-700"
                                  }`}
                                >
                                  {item.type.toUpperCase()}
                                </div>
                                {item.completed && (
                                  <span className="sm:hidden px-2 py-0.5 bg-linear-to-r from-emerald-100 to-teal-100 text-emerald-700 text-xs font-medium rounded-lg">
                                    DONE
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 ml-0 sm:ml-4 mt-3 sm:mt-0">
                        {item.type === "video" && !item.completed && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => markAsWatched(item.id)}
                            className="px-3 py-2 rounded-lg bg-linear-to-r from-blue-50 to-cyan-50 text-blue-700 hover:shadow transition-all duration-100 text-sm font-medium flex-1 sm:flex-none"
                          >
                            <span className="hidden sm:inline">
                              Mark as Watched
                            </span>
                            <span className="sm:hidden">Watched</span>
                          </motion.button>
                        )}

                        {/* ✅ CEO only edit/delete */}
                        {isAdmin && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openEditModal(item)}
                            className="p-2 rounded-lg bg-slate-50 hover:bg-purple-50 text-slate-600 hover:text-purple-600 transition-all duration-100 group/edit flex-1 sm:flex-none justify-center"
                          >
                            <Pencil
                              size={18}
                              className="mx-auto group-hover/edit:scale-110 transition-transform duration-100"
                            />
                          </motion.button>
                        )}
                        {isAdmin && (
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setDeleteTarget(item)}
                            className="p-2 rounded-lg bg-slate-50 hover:bg-red-50 text-slate-600 hover:text-red-600 transition-all duration-100 group/delete flex-1 sm:flex-none justify-center"
                          >
                            <Trash2
                              size={18}
                              className="mx-auto group-hover/delete:scale-110 transition-transform duration-100"
                            />
                          </motion.button>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 sm:p-4 sm:px-6 border-t border-slate-100"
                      >
                        {item.type === "video" && (
                          <div className="relative group/video">
                            <iframe
                              src={item.src}
                              className="w-full h-75 sm:h-100 md:h-125 rounded-xl border-4 border-white shadow-lg"
                              title={item.title || "Video"}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                              allowFullScreen
                            />
                          </div>
                        )}

                        {item.type === "image" && (
                          <div className="relative group/image">
                            <iframe
                              src={item.src}
                              className="w-full h-75 sm:h-100 md:h-125 rounded-xl border-4 border-white shadow-lg"
                              title={item.title || "image"}
                              allowFullScreen
                            />
                          </div>
                        )}

                        {item.type === "pdf" && (
                          <div className="relative group/pdf">
                            <iframe
                              src={item.src}
                              className="w-full h-75 sm:h-100 md:h-125 rounded-xl border-4 border-white shadow-lg"
                              title={item.title}
                            />
                          </div>
                        )}
                      </motion.div>
                    )}
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-10 sm:py-16"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto bg-linear-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center mb-4 sm:mb-6">
                  <BookOpen className="w-8 h-8 sm:w-10 sm:h-10 text-slate-400" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                  No Training Materials Found
                </h3>
                <p className="text-sm text-slate-500 mb-6">
                  Try adjusting your search or filters
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setShowCompleted(true);
                  }}
                  className="px-6 py-3 bg-linear-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-200 transition-all duration-100 text-sm sm:text-base"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>

          {/* Summary Footer */}
          <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-linear-to-r from-emerald-500 to-teal-500"></div>
                  <span className="text-sm text-slate-600">Completed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-linear-to-r from-purple-500 to-pink-500"></div>
                  <span className="text-sm text-slate-600">In Progress</span>
                </div>
              </div>

              <div className="text-sm text-slate-600 text-center sm:text-right">
                <span className="font-bold text-slate-900">
                  {userProgress.totalTimeSpent}m
                </span>{" "}
                total •
                <span className="font-bold text-slate-900 ml-2">
                  {userProgress.streakDays} day
                </span>{" "}
                streak
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
}