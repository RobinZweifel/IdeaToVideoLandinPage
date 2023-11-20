const CTA = () => (
  <SectionWrapper>
    <div className="custom-screen">
      <div className="max-w-2xl mx-auto text-center">
        <h2
          className="text-gray-800 text-3xl font-semibold sm:text-4xl"
          id="oss"
        >
          Test
        </h2>
        <p className="mt-3 text-gray-600">
          Test
        </p>
      </div>
    </div>
  </SectionWrapper>
);

const SectionWrapper = ({ children, ...props }: any) => (
  <section {...props} className={`py-16 ${props.className || ''}`}>
    {children}
  </section>
);

export default CTA;
