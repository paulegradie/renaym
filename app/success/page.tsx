import Link from 'next/link';

export default function SuccessPage() {
  return (
    <section className="py-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <span className="text-4xl">✅</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Payment Successful!</h1>
          <p className="text-xl text-gray-600">
            Thank you for purchasing Renaime
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">What's Next?</h2>
          
          <div className="space-y-4 text-left">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">📧</span>
              <div>
                <h3 className="font-semibold text-gray-900">Check Your Email</h3>
                <p className="text-gray-600">
                  Your license key has been sent to your email address. It may take a few minutes to arrive.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">💾</span>
              <div>
                <h3 className="font-semibold text-gray-900">Download Renaime</h3>
                <p className="text-gray-600">
                  If you haven't already, download the application for your platform.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <span className="text-2xl">🔑</span>
              <div>
                <h3 className="font-semibold text-gray-900">Activate Your License</h3>
                <p className="text-gray-600">
                  Open Renaime, go to Settings, and enter your license key to unlock all features.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/download"
            className="px-8 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-primary/90 transition"
          >
            Download Renaime
          </Link>
          <Link
            href="/retrieve-license"
            className="px-8 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary/10 transition"
          >
            Retrieve License Key
          </Link>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <strong>Lost your email?</strong> You can retrieve your license key anytime using your email address.
          </p>
        </div>
      </div>
    </section>
  );
}

