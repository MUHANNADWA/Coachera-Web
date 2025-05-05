export default function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Learn</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Courses</a></li>
              <li><a href="#" className="hover:underline">Degrees</a></li>
              <li><a href="#" className="hover:underline">Skills</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Community</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Learners</a></li>
              <li><a href="#" className="hover:underline">Partners</a></li>
              <li><a href="#" className="hover:underline">Developers</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">More</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Mobile App</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Blog</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="wrap-anywhere">support@coachera.com</p>
            <div className="flex space-x-4 mt-4">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-linkedin"></i></a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>© 2023 Coachera. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}