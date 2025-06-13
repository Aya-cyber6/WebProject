import React from 'react';

const Nation = () => {
    return (
        <div
            className="container d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: '90vh', padding: '20px' }}
        >
            <div
                className="p-5 shadow rounded"
                style={{
                    maxWidth: '900px',
                    width: '100%',
                    backgroundColor: '#f8f9fa', // Açık gri arka plan
                    fontSize: '1.1rem',
                    lineHeight: '1.8',
                }}
            >
                <h2 className="mb-4 text-center">Türkiye Hakkında Ulusal Coğrafi Bilgiler</h2>

                <p>
                    Türkiye, büyük ölçüde Anadolu Yarımadası'nda bulunan, küçük bir bölümü ise Balkanlar'da yer alan bir ülkedir.
                    Hem Asya hem de Avrupa kıtalarında toprakları bulunması nedeniyle kültürel ve coğrafi açıdan benzersizdir.
                </p>

                <ul className="mb-4" style={{ paddingLeft: '1.5rem' }}>
                    <li><strong>Nüfus:</strong> Yaklaşık 85 milyon, dünyada 17. sırada.</li>
                    <li><strong>En Kalabalık Şehir:</strong> İstanbul (~15,5 milyon nüfus).</li>
                    <li><strong>En Az Nüfusa Sahip Şehir:</strong> Tunceli (~85.000 nüfus).</li>
                    <li><strong>Yüzölçümü:</strong> Yaklaşık 783.356 km².</li>
                    <li><strong>En Büyük Yüzölçümüne Sahip İl:</strong> Konya (yaklaşık 40.813 km²).</li>
                    <li><strong>En Küçük Yüzölçümüne Sahip İl:</strong> Yalova (yaklaşık 847 km²).</li>
                </ul>

                <p className="mb-0">
                    Türkiye’nin tarihi, kültürel ve doğal zenginlikleri hakkında daha fazla bilgiye{" "}
                    <a
                        href="https://yerelnet.org.tr"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: '#1a73e8',
                            textDecoration: 'none',
                            fontWeight: 550,
                        }}
                    >
                        yerelrehber
                    </a>{" "}
                    web sitesi üzerinden ulaşabilirsiniz.
                </p>
            </div>
        </div>
    );
};

export default Nation;




