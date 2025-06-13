import React, { useState, useEffect } from "react";
import Altbar from '../components/Altbar';

function Institutions() {
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
    .hover-shadow:hover {
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
      transform: translateY(-5px);
      transition: all 0.2s ease-in-out;
    }
  `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const institutions = [
    {
      name: "Adalet Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1.1.8.0.webp",
      website: "https://www.adalet.gov.tr/",
      phone: "+90 312 417 77 70",
      address: "Adalet Bakanlığı, 06659 Kızılay / ANKARA"
    },
    {
      name: "Adli Tıp Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1384.1.8.0.webp",
      website: "https://www.atk.gov.tr/",
      phone: "+90 212 454 15 00",
      address: "Fevzi Çakmak Mahallesi Sanayi Caddesi Kımız Sokak No:1 34196 BAHÇELİEVLER / İSTANBUL - TÜRKİYE"
    },
    {
      name: "Afet ve Acil Durum Yönetimi Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/253.1.8.0.webp",
      website: "https://www.afad.gov.tr",
      phone: "+90 312 258 23 23",
      address: "Üniversiteler Mah. Dumlupınar Bulvarı No: 159, Bilkent ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Aile ve Sosyal Hizmetler Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1378.1.8.0.webp",
      website: "https://www.aile.gov.tr/",
      phone: "+90 312 705 40 00",
      address: "Eskişehir Yolu 8. Km, 06520 Çankaya / Ankara"
    },
    {
      name: "Anayasa Mahkemesi Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/69.1.8.0.webp",
      website: "https://www.anayasa.gov.tr",
      phone: "+90 312 463 73 00",
      address: "Ahlatlıbel Mahallesi İncek Yolu Serpmeleri No:4 06890 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Ankara Ticaret Odası",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1035.1.8.0.webp",
      website: "https://www.atonet.org.tr/",
      phone: "+90 312 201 81 00",
      address: "Söğütözü Mahallesi 2180. Cadde No: 5/A 06530 06530 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Atatürk Kültür, Dil ve Tarih Yüksek Kurumu Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/78.1.8.0.webp",
      website: "https://www.ayk.gov.tr/",
      phone: "+90 312 285 55 12",
      address: "Ziyabey Cad. No:19 Balgat 06520 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Avrupa Birliği Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/80.1.8.0.webp",
      website: "https://www.ab.gov.tr/",
      phone: "+90 312 218 13 00",
      address: "Mustafa Kemal Mah. 2082 Cad. No:5 100. Yıl 06530 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Avrupa Birliği Eğitim ve Gençlik Programları Merkezi Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/361.1.8.0.webp",
      website: "https://www.ua.gov.tr/",
      phone: "+90 312 409 60 00",
      address: "Mevlana Bulvarı No:181 Balgat 06520 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Bankacılık Düzenleme ve Denetleme Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/81.1.8.0.webp",
      website: "https://www.bddk.org.tr",
      phone: "+90 212 214 50 00",
      address: "Esentepe Mahallesi Büyükdere Caddesi No:106 ŞİŞLİ / İSTANBUL - TÜRKİYE"
    },
    {
      name: "Bankalararası Kart Merkezi",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1000020.1.8.0.webp",
      website: "https://www.bkm.com.tr",
      phone: "+90 212 350 79 00",
      address: "Nispetiye Caddesi, Akmerkez E3 Blok Kat:2/3 BEŞİKTAŞ / İSTANBUL - TÜRKİYE"
    },
    {
      name: "Basın İlan Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/360.1.8.0.webp",
      website: "https://www.bik.gov.tr/",
      phone: "+90 212 999 40 40",
      address: "General Ali Rıza Gürcan Cad. No:27/1 GÜNGÖREN / İSTANBUL - TÜRKİYE"
    },
    {
      name: "Batı Akdeniz Kalkınma Ajansı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1440.1.8.0.webp",
      website: "www.baka.gov.tr",
      phone: "+90 246 224 3737",
      address: "Çünür Mahallesi 102. Cadde Ekonomi Kampüsü MERKEZ / ISPARTA - TÜRKİYE"
    },
    {
      name: "Bilgi Teknolojileri ve İletişim Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/318.1.8.0.webp",
      website: "https://www.btk.gov.tr/",
      phone: "+90 312 412 20 00",
      address: "Eskişehir Yolu 10.Km No:276 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Boru Hatları İle Petrol Taşıma A.Ş. Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/97.1.8.0.webp",
      website: "https://www.botas.gov.tr/",
      phone: "+90 312 297 20 00",
      address: "Bilkent Plaza A - II Blok Bilkent ANKARA 06800 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Cumhurbaşkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/100.1.8.0.webp",
      website: "https://www.tccb.gov.tr/",
      phone: "+90 312 525 55 55",
      address: "Cumhurbaşkanlığı Külliyesi Beştepe 06560 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Cumhurbaşkanlığı Dijital Dönüşüm Ofisi Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1131.1.8.0.webp",
      website: "https://cbddo.gov.tr/",
      phone: "+90 312 969 39 00",
      address: "T.C. Cumhurbaşkanlığı Çankaya Yerleşkesi 06550 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Cumhurbaşkanlığı İnsan Kaynakları Ofisi Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1244.1.8.0.webp",
      website: "https://www.cbiko.gov.tr",
      phone: "+90 312 525 43 90",
      address: "T.C. Cumhurbaşkanlığı Külliyesi 06560 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Çalışma ve Sosyal Güvenlik Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1377.1.8.0.webp",
      website: "https://www.csgb.gov.tr/",
      phone: "+90 312 296 60 00",
      address: "Emek Mah. 17. Cd. No:13 Çankaya / Ankara"
    },
    {
      name: "Çanakkale Savaşları Gelibolu Tarihi Alan Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/11583.1.8.0.webp",
      website: "https://canakkaletarihialan.gov.tr/",
      phone: "+90 286 814 11 28",
      address: "Kemalpaşa Mahallesi Kilye Mevkii No:1 ECEABAT / ÇANAKKALE - TÜRKİYE"
    },
    {
      name: "Çay İşletmeleri Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/6.1.8.0.webp",
      website: "https://www.caykur.gov.tr/",
      phone: "+90 464 213 02 11",
      address: "Müftü Mah. Menderes Bulvarı 53080 ARDEŞEN / RİZE - TÜRKİYE"
    },
    {
      name: "Çevre, Şehircilik ve İklim Değişikliği Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/4.1.8.0.webp",
      website: "https://www.csb.gov.tr",
      phone: "+90 312 410 10 00",
      address: "Mustafa Kemal Mahallesi Eskişehir Devlet Yolu 9.km No: 278 06573 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Deniz Kuvvetleri Komutanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1479.1.8.0.webp",
      website: "https://www.dzkk.tsk.tr",
      phone: "+90 312 403 33 33",
      address: "Deniz Kuvvetleri Komutanlığı Devlet Mahallesi 06100 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Devlet Arşivleri Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/9.1.8.0.webp",
      website: "https://www.devletarsivleri.gov.tr/",
      phone: "+90 312 307 90 00",
      address: "Devlet Arşivleri Başkanlığı Gayret Mahallesi 95. Sokak No:3 YENİMAHALLE / ANKARA - TÜRKİYE"
    },
    {
      name: "Devlet Hava Meydanları İşletmesi Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/110.1.8.0.webp",
      website: "https://www.dhmi.gov.tr",
      phone: "+90 312 204 20 00",
      address: "Emniyet Mahallesi Mevlana Bulvarı, No:32 Etiler 06560 YENİMAHALLE / ANKARA - TÜRKİYE"
    },
    {
      name: "Devlet Opera ve Balesi Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/113.1.8.0.webp",
      website: "https://www.operabale.gov.tr",
      phone: "+90 312 229 76 25",
      address: "Hanımeli Sok. No:11 Sıhhiye 06050 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Devlet Su İşleri Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/116.1.8.0.webp",
      website: "https://www.dsi.gov.tr/",
      phone: "+90 312 454 5454",
      address: "Mustafa Kemal Mahallesi Anadolu Bulvarı No:9 06530 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Devlet Tiyatroları Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/117.1.8.0.webp",
      website: "http://www.devtiyatro.gov.tr/",
      phone: "+90 312 310 19 45",
      address: "Devlet Tiyatroları Genel Müdürlüğü Ulus/ ANKARA 06050 ALTINDAĞ / ANKARA - TÜRKİYE"
    },
    {
      name: "Dışişleri Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/11.1.8.0.webp",
      website: "https://www.mfa.gov.tr",
      phone: "+90 312 292 10 00",
      address: "Dr. Sadık Ahmet Cad. No:8 06100 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Doğal Afet Sigortaları Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1007.1.8.0.webp",
      website: "https://dask.gov.tr/",
      phone: "125",
      address: "Dr. Adnan Büyükdeniz Caddesi, Ak Ofis No:8/1 34768 ÜMRANİYE / İSTANBUL - TÜRKİYE"
    },
    {
      name: "e-Devlet Kapısı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1473.1.8.0.webp",
      website: "https://www.turkiye.gov.tr",
      phone: "-",
      address: "T.C. Cumhurbaşkanlığı Çankaya Yerleşkesi 06550 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Elektrik Üretim A.Ş. Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/127.1.8.0.webp",
      website: "https://www.euas.gov.tr/",
      phone: "+90 312 295 50 00",
      address: "Mustafa Kemal Mah. Dumlupınar Bulvarı No: 166 06490 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Emniyet Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/13.1.8.0.webp",
      website: "https://www.egm.gov.tr/",
      phone: "+90 312 462 04 62",
      address: "Ayrancı Mahallesi Dikmen Caddesi No: 11 06100 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Enerji ve Tabii Kaynaklar Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/129.1.8.0.webp",
      website: "https://www.enerji.gov.tr/",
      phone: "+90 312 212 64 20",
      address: "İnönü Bulvarı No:27 Bahçelievler 06100 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Et ve Süt Kurumu Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/131.1.8.0.webp",
      website: "https://www.esk.gov.tr",
      phone: "+90 312 284 36 70",
      address: "İşçi Blokları Mahallesi, Muhsin Yazıcıoğlu Cd. No:51/B 06530 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Gelir İdaresi Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/14.1.8.0.webp",
      website: "https://www.gib.gov.tr/",
      phone: "+90 312 415 29 00",
      address: "Devlet Mahallesi Merasim Cad. No:9/1 06450 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Göç İdaresi Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/413.1.8.0.webp",
      website: "https://www.goc.gov.tr",
      phone: "+90 312 422 05 00",
      address: "Lalegül Çamlıca Mahallesi 122. Sokak No:4 YENİMAHALLE / ANKARA - TÜRKİYE"
    },
    {
      name: "Hava Kuvvetleri Komutanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1102.1.8.0.webp",
      website: "https://www.hvkk.tsk.tr/",
      phone: "+90 312 419 22 08",
      address: "Devlet, İsmet İnönü Blv. No:9, 06420 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Hazine ve Maliye Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/32.1.8.0.webp",
      website: "https://www.hmb.gov.tr/",
      phone: "+90 312 415 29 00",
      address: "Dikmen cad. No : 2 06450 / ANKARA - TÜRKİYE"
    },
    {
      name: "İçişleri Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/145.1.8.0.webp",
      website: "https://www.icisleri.gov.tr",
      phone: "+90 312 422 40 00",
      address: "İnönü Bul. Bakanlıklar 06644 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "İletişim Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/82.1.8.0.webp",
      website: "https://www.iletisim.gov.tr",
      phone: "+90 312 590 20 00​​",
      address: "Kızılırmak Mah. Mevlana Bulvarı No:144 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "İstanbul Finans Merkezi",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1468.1.8.0.webp",
      website: "https://www.ifm.gov.tr",
      phone: "+90 216 690 05 00",
      address: "Finanskent Mahallesi Finans Caddesi No:46/3 ÜMRANİYE / İSTANBUL - TÜRKİYE"
    },
    {
      name: "İstanbul Ticaret Odası",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1091.1.8.0.webp",
      website: "https://www.ito.org.tr",
      phone: "+90 444 04 86",
      address: "İstanbul Ticaret Odası Merkez Bina 34112 / İSTANBUL - TÜRKİYE"
    },
    {
      name: "Jandarma Genel Komutanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/165.1.8.0.webp",
      website: "https://www.jandarma.gov.tr/",
      phone: "+90 312 456 25 55",
      address: "Beştepe Mahallesi 8. Sokak No:47 06100 YENİMAHALLE / ANKARA - TÜRKİYE"
    },
    {
      name: "Jandarma ve Sahil Güvenlik Akademisi",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1040.1.8.0.webp",
      website: "http://www.jsga.edu.tr",
      phone: "+90 312 464 74 74",
      address: "İncek Şehit Savcı Mehmet Selim Kiraz Bulvarı 06805 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Kamu İhale Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/168.1.8.0.webp",
      website: "https://www.ihale.gov.tr/",
      phone: "+90 312 218 45 00",
      address: "Mevlana Bulvarı No:186 Balgat 06520 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Kara Kuvvetleri Komutanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1021.1.8.0.webp",
      website: "https://www.kkk.tsk.tr",
      phone: "+90 312 411 11 18",
      address: "Kara Kuvvetleri Komutanlığı 06100 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Karayolları Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/172.1.8.0.webp",
      website: "https://www.kgm.gov.tr/",
      phone: "+90 312 449 90 00",
      address: "İnönü Bulvarı No: 14 06100 Yücetepe 06100 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Kıyı Emniyeti Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/18.1.8.0.webp",
      website: "https://www.kiyiemniyeti.gov.tr/",
      phone: "+90 216 531 40 00",
      address: "Beylerbeyi Mah. Abdullahağa Cad. No:16A Üsküdar 34676 ADALAR / İSTANBUL - TÜRKİYE"
    },
    {
      name: "Kişisel Verileri Koruma Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1221.1.8.0.webp",
      website: "https://www.kvkk.gov.tr/",
      phone: "+90 312 216 50 00",
      address: "Nasuh Akar Mah. 1407. Sok. No: 4 06520 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Kültür ve Turizm Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/20.1.8.0.webp",
      website: "https://www.ktb.gov.tr/",
      phone: "+90 312 470 80 00",
      address: "İsmet İnönü Bulvarı No:32 06100 Emek/Ankara / ANKARA - TÜRKİYE"
    },
    {
      name: "Maden Tetkik ve Arama Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/183.1.8.0.webp",
      website: "https://www.mta.gov.tr/",
      phone: "+90 312 287 34 30",
      address: "Üniversiteler Mahallesi Dumlupınar Bulvarı No:139 06800 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Maden ve Petrol İşleri Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/182.1.8.0.webp",
      website: "https://www.mapeg.gov.tr/",
      phone: "+90 312 212 80 00",
      address: "Mevlana Bulvarı No:76 Beştepe YENİMAHALLE / ANKARA - TÜRKİYE"
    },
    {
      name: "Mesleki Yeterlilik Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/357.1.8.0.webp",
      website: "https://www.myk.gov.tr/",
      phone: "+90 312 458 20 00",
      address: "Balgat Mahallesi 1420. Cadde No:12 06520 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Milli Eğitim Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/21.1.8.0.webp",
      website: "https://www.meb.gov.tr/",
      phone: "+90 312 419 14 10",
      address: "Atatürk Bulvarı Bakanlıklar / ANKARA - TÜRKİYE"
    },
    {
      name: "Millî Savunma Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/206.1.8.0.webp",
      website: "http://www.msb.gov.tr/",
      phone: "+90 312 402 61 00",
      address: "Bakanlıklar 06100 ANKARA TÜRKİYE"
    },
    {
      name: "Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/26.1.8.0.webp",
      website: "https://www.nvi.gov.tr/",
      phone: "+90 312 591 21 00",
      address: "Çamlıca Mahallesi 408.Cadde No:136 06200 YENİMAHALLE / ANKARA - TÜRKİYE"
    },
    {
      name: "Orman Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/226.1.8.0.webp",
      website: "https://www.ogm.gov.tr/",
      phone: "+90 312 296 40 00",
      address: "Beştepe Mahallesi Söğütözü Caddesi No:8/1 06560 YENİMAHALLE / ANKARA - TÜRKİYE"
    },
    {
      name: "Ölçme, Seçme ve Yerleştirme Merkezi (ÖSYM)",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/27.1.8.0.webp",
      website: "https://www.osym.gov.tr/",
      phone: "+90 3122988050",
      address: "Üniversiteler Mahallesi İhsan Doğramacı Bulvarı No: 1 06800 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Polis Akademisi Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1023.1.8.0.webp",
      website: "https://www.pa.edu.tr",
      phone: "+90 312 462 86 49",
      address: "Eymir Mah. 49. Sokak 06834 GÖLBAŞI / ANKARA - TÜRKİYE"
    },
    {
      name: "PTT",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/28.1.8.0.webp",
      website: "https://www.ptt.gov.tr/",
      phone: "+90 312 509 50 00",
      address: "Şehit Teğmen Kalmaz Cd. No:2 Ulus 06101 ALTINDAĞ / ANKARA - TÜRKİYE"
    },
    {
      name: "Radyo ve Televizyon Üst Kurulu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/240.1.8.0.webp",
      website: "https://www.rtuk.gov.tr",
      phone: "+90 312 297 50 00",
      address: "Bilkent Plaza B2 Blok 06530 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Rekabet Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/242.1.8.0.webp",
      website: "https://www.rekabet.gov.tr/",
      phone: "+90 312 291 44 44",
      address: "Üniversiteler Mahallesi 1597. Cadde No:9 06800 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Sağlık Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/29.1.8.0.webp",
      website: "https://www.saglik.gov.tr",
      phone: "+90 312 585 10 00",
      address: "Üniversiteler Mh., 6001 Caddesi, Dumlupınar Blv. No:9, 06800 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Sanayi ve Teknoloji Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/30.1.8.0.webp",
      website: "https://www.sanayi.gov.tr/",
      phone: "+90 312 201 50 00",
      address: "Mustafa Kemal Mahallesi Dumlupınar Bulvarı  06510 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Savunma Sanayii Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/246.1.8.0.webp",
      website: "https://www.ssb.gov.tr",
      phone: "+90 312 411 90 00",
      address: "Devlet Mahallesi Süleyman Emin Caddesi No:6-7 06420 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Sayıştay Başkanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/250.1.8.0.webp",
      website: "https://www.sayistay.gov.tr/",
      phone: "+90 312 295 30 00",
      address: "İnönü Bulvarı No:45 Balgat 06520 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Sivil Havacılık Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/252.1.8.0.webp",
      website: "https://web.shgm.gov.tr/",
      phone: "+90 312 203 60 00",
      address: "Gazi Mustafa Kemal Bulvarı No:128/A Maltepe 06570 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Sosyal Güvenlik Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/254.1.8.0.webp",
      website: "http://www.sgk.gov.tr/",
      phone: "+90 312 207 80 00",
      address: "Ziyabey Cad. No:9 Balgat ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Tapu ve Kadastro Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/262.1.8.0.webp",
      website: "https://www.tkgm.gov.tr/",
      phone: "+90 312 413 60 00",
      address: "Dikmen Caddesi No:14 (06100) Bakanlıklar 06100 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Tarım ve Orman Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/33.1.8.0.webp",
      website: "https://www.tarimorman.gov.tr/",
      phone: "+90 312 287 33 60",
      address: "Eskişehir Yolu 9 km. Lodumlu ANKARA / ANKARA - TÜRKİYE"
    },
    {
      name: "TCDD",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/34.1.8.0.webp",
      website: "https://www.tcdd.gov.tr/",
      phone: "+90 312 309 05 15",
      address: "Talatpaşa Bulvarı 06330 ALTINDAĞ / ANKARA - TÜRKİYE"
    },
    {
      name: "Ticaret Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/15.1.8.0.webp",
      website: "https://www.ticaret.gov.tr/",
      phone: "+90 312 449 10 00",
      address: "Üniversiteler Mah. Dumlupınar Bulvarı No:151 6800 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Toplu Konut İdaresi Başkanlığı (TOKİ)",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/38.1.8.0.webp",
      website: "https://www.toki.gov.tr/",
      phone: "+90 312 266 76 80",
      address: "Bilkent Plaza B1 Blok Bilkent 06800 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Türk Akreditasyon Kurumu (TÜRKAK)",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/281.1.8.0.webp",
      website: "https://www.turkak.org.tr/",
      phone: "+90 312 410 82 00",
      address: "Mustafa Kemal Mahallesi 2125. Sokak No:1 06660 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Türk Hava Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1235.1.8.0.webp",
      website: "https://www.thk.org.tr/",
      phone: "+90 444 0 845",
      address: "Hacettepe Mahallesi, Atatürk Bulvarı No:33 Opera ALTINDAĞ / ANKARA - TÜRKİYE"
    },
    {
      name: "Türkiye Cumhuriyet Merkez Bankası",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/44.1.8.0.webp",
      website: "https://www.tcmb.gov.tr/",
      phone: "+90 312 507 50 00",
      address: "İstiklal Cad. 10 Ulus 06050 ALTINDAĞ / ANKARA - TÜRKİYE"
    },
    {
      name: "Türkiye Elektrik Dağıtım A.Ş. Genel Müdürlüğü",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/35.1.8.0.webp",
      website: "https://www.tedas.gov.tr/",
      phone: "+90 312 212 69 00",
      address: "İnönü Bulvarı No:27 Bahçelievler 06490 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Türkiye Enerji Nükleer ve Maden Araştırma Kurumu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1298.1.8.0.webp",
      website: "https://www.tenmak.gov.tr",
      phone: "+90 312 295 87 00",
      address: "ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Türkiye İstatistik Kurumu Başkanlığı (TÜİK)",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/291.1.8.0.webp",
      website: "https://www.tuik.gov.tr/",
      phone: "+90 312 454 70 00",
      address: "Devlet Mah. Necatibey Cad. No:114 06420 06100 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Türkiye İş Kurumu (İŞKUR)",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/17.1.8.0.webp",
      website: "https://www.iskur.gov.tr/",
      phone: "+90 444 75 87",
      address: "Emniyet Mahallesi Mevlana Bulvarı No:42 YENİMAHALLE / ANKARA - TÜRKİYE"
    },
    {
      name: "Türkiye Sualtı Sporları Federasyonu",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/1201.1.8.0.webp",
      website: "https://tssf.gov.tr/",
      phone: "+90 312 310 41 36",
      address: "Mebusevler Mah. Ayten Sok. No: 37 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Ulaştırma ve Altyapı Bakanlığı",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/302.1.8.0.webp",
      website: "https://www.uab.gov.tr/",
      phone: "+90 312 203 10 00",
      address: "Hakkı Turayliç Caddesi No:5 Emek 06510 ÇANKAYA / ANKARA - TÜRKİYE"
    },
    {
      name: "Yükseköğretim Kurulu Başkanlığı (YÖK)",
      logo: "https://cdn.e-devlet.gov.tr/themes/ankara/images/logos/64webp/312.1.8.0.webp",
      website: "https://www.yok.gov.tr/",
      phone: "+90 312 298 70 00",
      address: "Üniversiteler Mh., 1600. Cad. No:10, 06800 ÇANKAYA / ANKARA - TÜRKİYE"
    },

  ];

  const filteredInstitutions = institutions.filter(inst =>
    inst.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const titleStyle = {
    fontSize: "32px",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#222",
    textAlign: "center"
  };

  const descriptionStyle = {
    textAlign: "center",
    maxWidth: "700px",
    margin: "0 auto 30px",
    fontSize: "16px",
    color: "#444"
  };

  const containerStyle = {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "101px 20px 40px"
  };


  return (
    <div style={containerStyle}>
      <h1 style={titleStyle}>Kurumlar</h1>
      <p style={descriptionStyle}>
        Türkiye Cumhuriyeti’nin temel devlet kurumları ile bazı özel kuruluşlara ait bilgileri bu sayfada bulabilir, ilgili bağlantıları kullanarak detaylara ulaşabilirsiniz.
      </p>

      <div className="position-relative w-50 mx-auto mb-4">
        <i className="bi bi-search position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"></i>
        <input
          type="text"
          className="form-control ps-5 border border-3 rounded-4"
          placeholder="Kurum ismine göre arayın..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            borderColor: '#adb5bd',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#74c0fc';
            e.target.style.boxShadow = '0 0 0 0.2rem rgba(14, 70, 190, 0.25)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = '#adb5bd';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {filteredInstitutions.map((inst, index) => (
          <div className="col" key={index}>
            <div className="card h-100 shadow-sm hover-shadow rounded-4"
              style={{ border: "1px solid black" }}>

              <div className="card-body text-center">
                <img
                  src={inst.logo}
                  alt={`${inst.name} logosu`}
                  className="mb-3"
                  style={{ maxWidth: "80px", maxHeight: "80px" }}
                />
                <h4 className="card-title fw-semibold mb-2">{inst.name}</h4>
                <p className="mb-2">
                  <a
                    href={inst.website}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-sm"
                    style={{
                      backgroundColor: "#f8f9fa",
                      color: "#555",
                      border: "1px solid #ccc",
                      borderRadius: "6px",
                      padding: "5px 12px",
                      fontSize: "14px",
                      textDecoration: "none"
                    }}
                  > Web sitesi </a>
                </p>

                <p className="card-text mb-1"><strong>Tel:</strong> {inst.phone}</p>
                <p className="card-text"><strong>Adres:</strong> {inst.address}</p>
              </div>
            </div>
          </div>
        ))}
        
      </div>
      <Altbar />
    </div>
  
  );
}
 
export default Institutions;
