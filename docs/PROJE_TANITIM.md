# TaskFlow — Proje Tanıtım Dokümanı

**Görev ve Proje Yönetim Sistemi API'si**
Node.js ile Backend Programlama — Bitirme Projesi

## 1. Projenin Amacı

TaskFlow, bir ekibin görevlerini tek bir yerden yönetebilmesi için geliştirilmiş bir REST API'dir. Projenin amacı; Node.js, Express.js, routing, middleware ve CRUD konularında eğitim boyunca öğrenilenleri gerçek hayatta kullanılabilecek bir uygulama üzerinde göstermektir.

## 2. Senaryo

Bir yazılım şirketi, ekip içindeki görevleri ve çalışanların sorumluluklarını takip etmek istemektedir. Bugüne kadar görevler sözlü olarak veya dağınık notlarla takip edildiği için kimin hangi iş üzerinde çalıştığı ve işlerin hangi aşamada olduğu net değildir.

TaskFlow ile:

- Yönetici yeni bir görev oluşturur ve bir çalışana atar (`assignee`).
- Göreve bir öncelik verilir (`low`, `medium`, `high`).
- Çalışan ilerledikçe görevin durumu güncellenir (`pending` → `in-progress` → `completed`).
- Ekip tüm görevleri listeleyebilir veya tek bir görevin detayına bakabilir.
- Geçerliliğini yitiren görevler sistemden silinir.

Sistem tamamen REST API mantığında çalışır; herhangi bir arayüz (web, mobil) veya Postman gibi bir araç bu API'ye istek göndererek kullanabilir.

## 3. Sistem Özeti

### Kullanılan Teknolojiler

- **Node.js** — çalışma ortamı
- **Express.js** — sunucu ve routing
- **JSON dosyası** — veri saklama (`data/tasks.json`)
- **Postman** — test

### Veri Modeli (Görev)

| Alan          | Açıklama                                        |
| ------------- | ----------------------------------------------- |
| `id`          | Otomatik verilen benzersiz numara               |
| `title`       | Görev başlığı (zorunlu)                         |
| `description` | Görev açıklaması                                |
| `status`      | Durum: `pending`, `in-progress`, `completed`    |
| `priority`    | Öncelik: `low`, `medium`, `high`                |
| `assignee`    | Görevin atandığı çalışan                        |
| `createdAt`   | Oluşturulma zamanı                              |
| `updatedAt`   | Son güncellenme zamanı                          |

### API Uçları

| Metot  | Adres        | İşlev             |
| ------ | ------------ | ----------------- |
| POST   | `/tasks`     | Görev ekleme      |
| GET    | `/tasks`     | Görev listeleme   |
| GET    | `/tasks/:id` | Görev detayı      |
| PUT    | `/tasks/:id` | Görev güncelleme  |
| DELETE | `/tasks/:id` | Görev silme       |

Tüm cevaplar JSON formatındadır. Başarılı işlemlerde `200`/`201`, bulunamayan görevlerde `404`, eksik veya hatalı veride `400` durum kodu döner.

### Mimari

Proje katmanlı bir yapıda düzenlenmiştir; her katmanın tek bir sorumluluğu vardır:

```
İstek → Logger Middleware → Route → Controller → Model → tasks.json
```

- **Route** (`src/routes`): Hangi adresin hangi fonksiyona gideceğini belirler.
- **Controller** (`src/controllers`): İsteği kontrol eder, cevabı hazırlar.
- **Model** (`src/models`): Görevleri JSON dosyasından okur ve dosyaya yazar.
- **Middleware** (`src/middleware`): Logger ve hata yönetimi.

### Logger Middleware

Sunucuya gelen her istek, route'lara ulaşmadan önce logger middleware'inden geçer. Middleware; isteğin **zaman damgasını**, **metodunu** ve **endpoint'ini** hem konsola hem de `logs/requests.log` dosyasına kaydeder. Böylece sistemde hangi işlemin ne zaman yapıldığı geriye dönük olarak izlenebilir.

## 4. Test

Beş CRUD ucunun tamamı Postman üzerinden test edilmiştir. Ekran görüntüleri `docs/ekran-goruntuleri/` klasöründedir. Kurulum ve çalıştırma adımları için [README](../README.md) dosyasına bakınız.
