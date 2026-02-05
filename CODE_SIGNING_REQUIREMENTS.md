# Code Signing Requirements for Renaym

## Context

Renaym is a desktop application distributed for Windows, macOS, and Linux. Users are experiencing security warnings when downloading and installing the software, particularly on Windows. This document outlines the requirements for implementing proper code signing to establish trust and eliminate security warnings.

## Current Status

### ✅ macOS - COMPLETE
- **Status**: Fully implemented and working
- **Location**: `.github/workflows/build-and-release-v0.0.yml` (lines 222-380)
- **Implementation**:
  - Code signing with Apple Developer certificate
  - Notarization via Apple's notarytool
  - DMG signing and stapling
  - Proper entitlements file
- **Secrets Required** (already configured):
  - `MACOS_CERTIFICATE` - Base64 encoded P12 certificate
  - `MACOS_CERTIFICATE_PWD` - Certificate password
  - `KEYCHAIN_PWD` - Temporary keychain password
  - `APPLE_ID` - Apple Developer account email
  - `APPLE_TEAM_ID` - Apple Developer Team ID
  - `APPLE_APP_PASSWORD` - App-specific password
  - `MACOS_SIGNING_IDENTITY` - Certificate identity name

### ❌ Windows - NOT IMPLEMENTED
- **Status**: No code signing currently implemented
- **Location**: `.github/workflows/build-and-release-v0.0.yml` (lines 104-172)
- **Current Build**:
  - Creates unsigned `.exe` installer via Inno Setup
  - Creates unsigned portable `.zip` archive
- **Impact**: Users see Windows Defender SmartScreen warnings and browser download blocks

### ✅ Linux - N/A
- **Status**: No code signing needed for Linux distributions
- **Format**: Standard tar.gz archive

## Requirements for Windows Code Signing

### 1. Obtain Code Signing Certificate

**Options:**
- **Standard Code Signing Certificate** (~$200-300/year)
  - Providers: DigiCert, Sectigo, SSL.com
  - Requires building SmartScreen reputation over time
  - Suitable for startups
  
- **Extended Validation (EV) Certificate** (~$500-600/year)
  - Immediate SmartScreen reputation
  - Requires hardware token or cloud HSM
  - Better for established companies

**Recommended for Renaym**: Start with Standard Code Signing Certificate from SSL.com or Sectigo

### 2. Implementation Requirements

**Files to Sign:**
1. `Renaym-Setup-v{VERSION}.exe` - Inno Setup installer
2. All `.exe` and `.dll` files in the portable package before zipping

**Signing Tool:**
- Use `signtool.exe` (included with Windows SDK)
- Available on GitHub Actions `windows-latest` runners

**Required GitHub Secrets:**
- `WINDOWS_CERTIFICATE` - Base64 encoded PFX/P12 certificate file
- `WINDOWS_CERTIFICATE_PASSWORD` - Certificate password
- `WINDOWS_SIGNING_IDENTITY` - Certificate subject name (optional, for verification)

### 3. Workflow Integration Points

**Location**: `.github/workflows/build-and-release-v0.0.yml`

**After line 126** (after publishing Windows client):
```yaml
- name: Sign Windows Executables
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    # Import certificate
    # Sign all .exe and .dll files in ./publish/win-x64/
    # Use timestamp server for long-term validity
```

**After line 144** (after building installer):
```yaml
- name: Sign Windows Installer
  if: github.ref == 'refs/heads/main' && github.event_name == 'push'
  env:
    WINDOWS_CERTIFICATE: ${{ secrets.WINDOWS_CERTIFICATE }}
    WINDOWS_CERTIFICATE_PASSWORD: ${{ secrets.WINDOWS_CERTIFICATE_PASSWORD }}
  run: |
    # Sign the installer .exe file
    # Use timestamp server
```

### 4. Signing Best Practices

**Timestamp Servers** (use one of these):
- DigiCert: `http://timestamp.digicert.com`
- Sectigo: `http://timestamp.sectigo.com`
- GlobalSign: `http://timestamp.globalsign.com`

**Why Timestamping Matters:**
- Allows signatures to remain valid after certificate expires
- Required for long-term trust

**Signature Algorithm:**
- Use SHA256 (not SHA1)
- Example: `/fd SHA256` flag for signtool

### 5. Verification Steps

After implementing signing:
1. Download signed installer from GitHub release
2. Right-click → Properties → Digital Signatures tab
3. Verify certificate details are correct
4. Test installation on clean Windows 10/11 VM
5. Confirm SmartScreen warning is reduced or eliminated

### 6. Cost-Benefit Analysis

**Annual Cost**: $200-500
**Benefits**:
- Eliminates Windows Defender SmartScreen warnings (after reputation builds)
- Prevents browser download blocks
- Increases user trust and download conversion rate
- Professional appearance
- Required for Windows Store distribution (future)

**ROI**: Even 5-10 additional users converting due to reduced friction pays for the certificate

## Implementation Checklist

- [ ] Purchase Windows code signing certificate
- [ ] Receive certificate file (PFX/P12 format)
- [ ] Convert certificate to base64: `certutil -encode certificate.pfx certificate.txt` (Windows) or `base64 -i certificate.pfx` (macOS/Linux)
- [ ] Add GitHub secrets:
  - [ ] `WINDOWS_CERTIFICATE`
  - [ ] `WINDOWS_CERTIFICATE_PASSWORD`
- [ ] Update `.github/workflows/build-and-release-v0.0.yml` with signing steps
- [ ] Test signing on a PR build
- [ ] Verify signature on downloaded installer
- [ ] Merge to main and create release
- [ ] Monitor SmartScreen reputation building

## Additional Recommendations

### SmartScreen Reputation Building
- Encourage users to download and install
- More installations = faster reputation building
- Typically takes 2-4 weeks with consistent downloads
- EV certificates bypass this waiting period

### Future Considerations
- **Windows Store**: Requires EV certificate
- **Auto-updates**: Signed updates are trusted by Windows
- **Enterprise deployment**: IT departments require signed software

## Support Resources

- **Microsoft SignTool Documentation**: https://learn.microsoft.com/en-us/windows/win32/seccrypto/signtool
- **GitHub Actions Windows Signing**: https://github.com/marketplace/actions/code-sign-action
- **Certificate Providers**:
  - SSL.com: https://www.ssl.com/code-signing/
  - Sectigo: https://sectigo.com/ssl-certificates-tls/code-signing
  - DigiCert: https://www.digicert.com/signing/code-signing-certificates

## Questions for Implementation Agent

1. Which certificate provider should we use? (Recommend SSL.com for budget-conscious startups)
2. Standard vs EV certificate? (Recommend Standard for now, upgrade to EV if budget allows)
3. Should we sign the portable ZIP contents or just the installer? (Recommend both)
4. How to handle certificate renewal? (Set calendar reminder 30 days before expiration)
5. Should we implement auto-update signing now or later? (Later, after basic signing works)

